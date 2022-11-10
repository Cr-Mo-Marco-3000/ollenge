package com.ollenge.scheduler;

import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.*;
import com.ollenge.db.repository.BadgeRepository;
import com.ollenge.db.repository.BadgeRepositorySupport;
import com.ollenge.db.repository.ChallengeRepository;
import com.ollenge.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Component
@AllArgsConstructor
public class CalculateScoreScheduler {

    private final ChallengeRepository challengeRepository;
    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;
    private final BadgeRepositorySupport badgeRepositorySupport;

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void calculateScore() {
        LocalDate target = LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedTarget = target.format(formatter);
        log.info("execute scheduler - {} + 1", formatedTarget);

        HashMap<Integer, String> presetIdToType = new HashMap<Integer, String>() {{
            put(null, "user");
            put(1, "ranking1");
            put(2, "ranking2");
            put(3, "ranking3");
            put(4, "ranking4");
            put(5, "ranking5");
            put(6, "ranking6");
        }};

        List<Challenge> challengeList = challengeRepository.findByEndDate(target);
        // 랭킹 챌린지가 종료되는 날, 랭킹 챌린지에 대한 로직 추가
        List<HashMap<Long, Integer>> challengeRankMap = new ArrayList<>();
        List<Integer> challengeListSize = new ArrayList<>();
        if(!challengeList.isEmpty() && target.equals(LocalDateTimeUtils.getLastDayOfTargetMonth(target))) {
            // 랭킹 계산 로직
            List<List<Challenge>> challengeListByPreset = new ArrayList<>();
            for (int i = 0; i < 7; i++) {
                challengeListByPreset.add(new ArrayList<>());
                challengeRankMap.add(new HashMap<>());
            }
            for(Challenge challenge : challengeList) {
                if(challenge.getChallengePreset() != null) {
                    challengeListByPreset.get((int) challenge.getChallengePreset().getChallengePresetId()).add(challenge);
                }
            }
            for (int presetIdx = 0; presetIdx < 7; presetIdx++) {
                challengeListSize.add(challengeListByPreset.get(presetIdx).size());
                Collections.sort(challengeListByPreset.get(presetIdx), (challenge1, challenge2) -> {
                    double achievement1 = (double) challenge1.getChallengeScore() / challenge1.getPeopleCnt();
                    double achievement2 = (double) challenge2.getChallengeScore() / challenge2.getPeopleCnt();
                    if (achievement2 > achievement1) return 1;
                    else if (achievement2 == achievement1) return 0;
                    else return -1;
                });
                int rank = 1;
                int offset = 1;
                for(int challengeIdx = 0; challengeIdx < challengeList.size(); challengeIdx++) {
                    if(challengeIdx == 0) {
                        challengeRankMap.get(presetIdx).put(challengeListByPreset.get(presetIdx).get(challengeIdx).getChallengeId(), rank);
                        continue;
                    }
                    if((double)challengeListByPreset.get(presetIdx).get(challengeIdx).getChallengeScore()/challengeListByPreset.get(presetIdx).get(challengeIdx).getPeopleCnt() == (double)challengeListByPreset.get(presetIdx).get(challengeIdx-1).getChallengeScore()/challengeListByPreset.get(presetIdx).get(challengeIdx-1).getPeopleCnt()) {
                        offset++;
                        challengeRankMap.get(presetIdx).put(challengeListByPreset.get(presetIdx).get(challengeIdx).getChallengeId(), rank);
                    } else {
                        rank += offset;
                        offset = 1;
                        challengeRankMap.get(presetIdx).put(challengeListByPreset.get(presetIdx).get(challengeIdx).getChallengeId(), rank);
                    }
                }
            }
        }

        // 유저, 타입 별로 가장 높은 등급의 뱃지 가져오기
        // user_id, type, grade
        HashMap<Long, HashMap<String, Integer>> highestBadgeMap = new HashMap<>();
        HashSet<User> userSet = new HashSet<>();
        for(Challenge challenge : challengeList) {
            List<Participation> participationList = challenge.getParticipation();
            for(Participation participation : participationList) {
                userSet.add(participation.getUser());
            }
        }
        List<User> userList = new ArrayList<>(userSet);
        List<Badge> userBadgeList = badgeRepositorySupport.getUserBadgeList(userList);
        for(Badge badge : userBadgeList) {
            if(!highestBadgeMap.containsKey(badge.getUser().getUserId())) {
                highestBadgeMap.put(badge.getUser().getUserId(), new HashMap<>());
            }
            int grade = highestBadgeMap.get(badge.getUser().getUserId()).getOrDefault(badge.getType(),0);
            highestBadgeMap.get(badge.getUser().getUserId()).put(badge.getType(), (badge.getGrade() > grade ? badge.getGrade() : grade));
        }

        // User score update를 위한 List
        List<User> userUpdateList = new ArrayList<>();
        // Badge Update를 위한 List
        List<Badge> badgeUpdateList = new ArrayList<>();
        // 랭킹 챌린지 챌린지 결과 Insert용 List
        List<Challenge> challengeUpdateList = new ArrayList<>();
        for(Challenge challenge : challengeList) {
            // 랭킹 챌린지의 경우 ChallengeResult 추가 및 foreign key 업데이트를 위해 list에 담음
            if(challenge.getChallengePreset() != null) {
                challenge.setChallengeResult(
                        ChallengeResult.builder()
                                .challengeRank(challengeRankMap.get((int) challenge.getChallengePreset().getChallengePresetId()).get(challenge.getChallengeId()))
                                .totalCnt(challengeListSize.get((int) challenge.getChallengePreset().getChallengePresetId()))
                                .build()
                );
                challengeUpdateList.add(challenge);
            }

            // 챌린지 참여자에 대한 점수와 뱃지 update
            List<Participation> participationList = challenge.getParticipation();
            for(Participation participation : participationList) {
                // 점수 update
                User user = participation.getUser();
                user.setUserScore(user.getUserScore() + (participation.getFeedCnt() * 10));
                userUpdateList.add(user);
                // 뱃지 update
                Integer challengePresetId = (challenge.getChallengePreset() != null ? (int)challenge.getChallengePreset().getChallengePresetId() : null);
                String type = presetIdToType.get(challengePresetId);
                int curGrade = highestBadgeMap.get(user.getUserId()).getOrDefault(type, 0);
                if (curGrade < 4) {
                    badgeUpdateList.add(Badge.builder().user(user).type(type).grade(curGrade + 1).challengePreset(challenge.getChallengePreset()).badgeFlag(false).build());
                    highestBadgeMap.get(user.getUserId()).put(type, curGrade + 1);
                }
            }

            // DB save
            userRepository.saveAll(userUpdateList);
            badgeRepository.saveAll(badgeUpdateList);
            challengeRepository.saveAll(challengeUpdateList);
        }
    }
}

package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.response.data.*;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.*;
import com.ollenge.db.repository.*;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@AllArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeRepositorySupport challengeRepositorySupport;
    private final ClassificationTypeRepository classificationTypeRepository;
    private final AuthClassificationRepository authClassificationRepository;
    private final ParticipationRepository participationRepository;
    private final ChallengePresetRepository challengePresetRepository;
    private final UserRepository userRepository;

    public ChallengeCreatedData createChallenge(Authentication authentication, ChallengePostReq challengePostReq) throws NoSuchElementException, InvalidDateTimeException, DuplicatedPeriodTopicRankingChallengeException, InvalidAuthTypeException, InvalidFieldException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        ChallengePreset challengePreset = null;
        // 날짜 검증
        if (!LocalDateTimeUtils.isValidStartDate(challengePostReq.getStartDate()) || !LocalDateTimeUtils.isValidEndDate(challengePostReq.getStartDate(), challengePostReq.getEndDate()))
            throw new InvalidDateTimeException("Start date or End Date invalid exception");
        //동일 주제, 기간 중복 검증
        if (challengePostReq.getChallengePresetId() != null) {
            challengePreset = ChallengePreset.builder()
                    .challengePresetId(challengePostReq.getChallengePresetId())
                    .build();
            if (isDuplicatedTopicPeriod(user, challengePostReq.getStartDate(), challengePostReq.getEndDate(), challengePreset)) {
                throw new DuplicatedPeriodTopicRankingChallengeException("Duplicated ranking challenge that has same period and topic exception");
            }
        }
        // 인증 방식 유효성 검증
        if(!isValidAuthType(challengePostReq.getAuthType())) {
            throw new InvalidAuthTypeException("Invalid auth type exception");
        }
        // 인증 코드 생성
        String inviteCode = RandomStringUtils.randomAlphanumeric(8);
        // DB 저장
        Challenge challenge = Challenge.ChallengeBuilder()
                .challengePreset(challengePreset)
                .challengeImg(challengePostReq.getChallengeImg())
                .challengeName(challengePostReq.getChallengeName())
                .challengeTopic(challengePostReq.getChallengeTopic())
                .authType(challengePostReq.getAuthType())
                .startDate(challengePostReq.getStartDate())
                .endDate(challengePostReq.getEndDate())
                .startTime(challengePostReq.getStartTime())
                .endTime(challengePostReq.getEndTime())
                .inviteCode(inviteCode)
                .rewardContent(challengePostReq.getRewardContent())
                .penaltyContent(challengePostReq.getPenaltyContent())
                .challengeScore(0)
                .challengeDescription(challengePostReq.getChallengeDescription())
                .build();

        challenge = challengeRepository.save(challenge);
        if (challengePostReq.getAuthType().equals("classifi")) {
            if(challengePostReq.getClassificationTypeID() == null) {
                throw new InvalidFieldException("Cannot match auth type to classification type");
            }
            ClassificationType classificationType = classificationTypeRepository.findById(challengePostReq.getClassificationTypeID()).orElseThrow(() -> { return new InvalidFieldException("Not exist classification type ID"); });
            AuthClassification authClassification = AuthClassification.builder()
                    .classificationType(classificationType)
                    .challenge(challenge)
                    .build();
            authClassificationRepository.save(authClassification);
        }

        challenge.setPeopleCnt(challenge.getPeopleCnt()+1);
        Participation participation = Participation.builder()
                .user(user)
                .challenge(challenge)
                .build();
        participationRepository.save(participation);

        return ChallengeCreatedData.of(challenge.getChallengeId(), inviteCode);
    }

    public void participateChallenge(Authentication authentication, ChallengeParticipationPostReq challengeParticipationPostReq) throws NoSuchElementException, DuplicatedPeriodTopicRankingChallengeException, InvalidChallengeIdException, InvalidParticipationException, InvalidDateTimeException, InvalidInviteCodeException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });

        Challenge challenge = challengeRepository.findById(challengeParticipationPostReq.getChallengeId())
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeParticipationPostReq.getChallengeId()); });
        
        if (!challenge.getInviteCode().equals(challengeParticipationPostReq.getInviteCode())) {
            throw new InvalidInviteCodeException("Invalid invite code");
        }
        else if (challenge.getChallengePreset() != null && isDuplicatedTopicPeriod(user, challenge.getStartDate(), challenge.getEndDate(), challenge.getChallengePreset())) {
            throw new DuplicatedPeriodTopicRankingChallengeException("Duplicated ranking challenge that has same period and topic exception");
        }
        else if (!participationRepository.findByChallengeAndUser(challenge, user).isEmpty()) {
            throw new InvalidParticipationException("Already participated challenge.");
        }
        else if (!LocalDateTimeUtils.isValidStartDate(challenge.getStartDate())) {
            throw new InvalidDateTimeException("Already started challenge.");
        }

        challenge.setPeopleCnt(challenge.getPeopleCnt()+1);
        Participation participation = Participation.builder()
                .user(user)
                .challenge(challenge)
                .build();
        participationRepository.save(participation);
    }

    @Transactional
    public void giveUpChallenge(Authentication authentication, long challengeId) throws NoSuchElementException, InvalidChallengeIdException, InvalidParticipationException, InvalidDateTimeException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });

        if (participationRepository.findByChallengeAndUser(challenge, user).isEmpty()) {
            throw new InvalidParticipationException("Not in challenge.");
        }
        else if (!LocalDateTimeUtils.isValidStartDate(challenge.getStartDate())) {
            throw new InvalidDateTimeException("Already started challenge.");
        }

        challenge.setPeopleCnt(challenge.getPeopleCnt()-1);
        participationRepository.deleteByChallengeAndUser(challenge, user);
        if (participationRepository.findByChallenge(challenge).isEmpty()) {
            challengeRepository.delete(challenge);
        }
    }

    public ChallengeInfoData getChallengeInfo(Authentication authentication, long challengeId) throws InvalidChallengeIdException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });

        ClassificationType classificationType = null;
        if (challenge.getAuthType().equals("classifi")) {
            AuthClassification authClassification = authClassificationRepository.findByChallenge(challenge);
            classificationType = authClassification.getClassificationType();
        }

        Boolean checkedFlag = null;
        List<Participation> participationList = participationRepository.findByChallengeAndUser(challenge, user);
        if(!participationList.isEmpty()) {
            checkedFlag = participationList.get(0).isCheckedFlag();
        }

        return ChallengeInfoData.of(challenge, classificationType, checkedFlag);
    }

    public List<ChallengeStateData> getChallengeState(Authentication authentication, long challengeId) throws InvalidChallengeIdException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });
        return challengeRepositorySupport.getChallengeState(challenge);
    }

    public List<ChallengePreset> getChallengePreset() {
        return challengePresetRepository.findAll();
    }

    public List<ChallengePresetData> getChallengePresetOngoing(Authentication authentication, LocalDate startDate, LocalDate endDate) throws InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        List<ChallengePreset> challengePresetList = challengePresetRepository.findAll();
        List<Long> participatedChallengePresetId = challengeRepositorySupport.getParticipatedChallengePresetId(user, startDate, endDate);
        List<ChallengePresetData> challengePresetDataList = new ArrayList<>();
        for(ChallengePreset challengePreset : challengePresetList) {
            if (participatedChallengePresetId.contains(challengePreset.getChallengePresetId())) {
                challengePresetDataList.add(ChallengePresetData.of(challengePreset, true));
            }
        }
        for(ChallengePreset challengePreset : challengePresetList) {
            if (!participatedChallengePresetId.contains(challengePreset.getChallengePresetId())) {
                challengePresetDataList.add(ChallengePresetData.of(challengePreset, false));
            }
        }

        return challengePresetDataList;
    }

    public List<ChallengeRankingData> getRankingDataList(Authentication authentication, long challengePresetId) throws InvalidUserException, InvalidChallengeIdException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        ChallengePreset challengePreset = challengePresetRepository.findById(challengePresetId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge preset ID " + challengePresetId); });

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        List<Challenge> challengeList = challengeRepositorySupport.getRankingChallengeListTopicPeriod(LocalDateTimeUtils.getFirstDayOfTargetMonth(today), LocalDateTimeUtils.getLastDayOfTargetMonth(today), challengePreset);

        List<ChallengeRankingData> challengeRankingDataList = new ArrayList<>();
        int rank = 1;
        int offset = 1;
        for(int i = 0; i < challengeList.size(); i++) {
            if(i == 0) {
                challengeRankingDataList.add(ChallengeRankingData.of(challengeList.get(i), rank));
                continue;
            }
            if((double)challengeList.get(i).getChallengeScore()/challengeList.get(i).getPeopleCnt() == (double)challengeList.get(i-1).getChallengeScore()/challengeList.get(i-1).getPeopleCnt()) {
                offset++;
                challengeRankingDataList.add(ChallengeRankingData.of(challengeList.get(i), rank));
            } else {
                rank += offset;
                offset = 1;
                challengeRankingDataList.add(ChallengeRankingData.of(challengeList.get(i), rank));
            }
        }
        return challengeRankingDataList;
    }

    public ChallengeRankingData getUserRankingData(Authentication authentication, long challengePresetId, List<ChallengeRankingData> challengeRankList) throws InvalidUserException, InvalidChallengeIdException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        ChallengePreset challengePreset = challengePresetRepository.findById(challengePresetId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge preset ID " + challengePresetId); });

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        List<Challenge> challengeList = challengeRepositorySupport.getRankingChallengeTopicPeriod(user, LocalDateTimeUtils.getFirstDayOfTargetMonth(today), LocalDateTimeUtils.getLastDayOfTargetMonth(today), challengePreset);
        if(challengeList.size() == 0) return null;
        Challenge challenge = challengeList.get(0);

        int rank = 0;
        for(ChallengeRankingData challengeRanking : challengeRankList) {
            if(challenge.getChallengeId() == challengeRanking.getChallengeId()) {
                rank = challengeRanking.getRank();
                break;
            }
        }
        return ChallengeRankingData.of(challenge, rank);
    }

    private boolean isValidAuthType(String authType) {
        return authType.equals("none") || authType.equals("feature") || authType.equals("classifi") || authType.equals("step");
    }

    private boolean isDuplicatedTopicPeriod(User user, LocalDate startDate, LocalDate endDate, ChallengePreset challengePreset) {
        List<Challenge> challengeList = challengeRepositorySupport.getRankingChallengeTopicPeriod(user, startDate, endDate, challengePreset);
        return !challengeList.isEmpty();
    }
}

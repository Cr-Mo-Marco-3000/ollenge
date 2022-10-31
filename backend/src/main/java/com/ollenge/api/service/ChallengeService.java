package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.*;
import com.ollenge.db.repository.*;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public ChallengeCreatedData createChallenge(ChallengePostReq challengePostReq) throws NoSuchElementException, InvalidDateTimeException, DuplicatedPeriodTopicRankingChallengeException, InvalidAuthTypeException, InvalidFieldException {
        ChallengePreset challengePreset = null;
        // 날짜 검증
        if (!LocalDateTimeUtils.isValidStartDate(challengePostReq.getStartDate()) || !LocalDateTimeUtils.isValidEndDate(challengePostReq.getStartDate(), challengePostReq.getEndDate()))
            throw new InvalidDateTimeException("Start date or End Date invalid exception");
        //동일 주제, 기간 중복 검증
        if (challengePostReq.getChallengePresetId() != null) {
            challengePreset = ChallengePreset.builder()
                    .challengePresetId(challengePostReq.getChallengePresetId())
                    .build();
            if (isDuplicatedTopicPeriod(challengePostReq.getStartDate(), challengePostReq.getEndDate(), challengePostReq.getChallengeTopic())) {
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

        long challengeId = challengeRepository.save(challenge).getChallengeId();
        if (challengePostReq.getAuthType().equals("classifi")) {
            if(challengePostReq.getClassificationTypeID() == null) {
                throw new InvalidFieldException("Cannot match auth type to classification type");
            }
            ClassificationType classificationType = classificationTypeRepository.findById(challengePostReq.getClassificationTypeID()).orElseThrow(() -> { return new InvalidFieldException("Not exist classification type ID"); });
            challenge.setChallengeId(challengeId);
            AuthClassification authClassification = AuthClassification.builder()
                    .classificationType(classificationType)
                    .challenge(challenge)
                    .build();
            authClassificationRepository.save(authClassification);
        }

        Participation participation = Participation.builder()
                .user(User.builder().userId(challengePostReq.getUserId()).build())
                .challenge(challenge)
                .build();
        participationRepository.save(participation);

        return ChallengeCreatedData.of(challengeId, inviteCode);
    }

    public void participateChallenge(ChallengeParticipationPostReq challengeParticipationPostReq) throws NoSuchElementException, DuplicatedPeriodTopicRankingChallengeException, InvalidChallengeIdException, AlreadyParticipatedException, InvalidDateTimeException, InvalidInviteCodeException {
        Challenge challenge = challengeRepository.findById(challengeParticipationPostReq.getChallengeId())
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeParticipationPostReq.getChallengeId()); });;
        User user = User.builder().userId(challengeParticipationPostReq.getUserId()).build();
        
        if (!challenge.getInviteCode().equals(challengeParticipationPostReq.getInviteCode())) {
            throw new InvalidInviteCodeException("Invalid invite code");
        }
        else if (challenge.getChallengePreset() != null && isDuplicatedTopicPeriod(challenge.getStartDate(), challenge.getEndDate(), challenge.getChallengeTopic())) {
            throw new DuplicatedPeriodTopicRankingChallengeException("Duplicated ranking challenge that has same period and topic exception");
        }
        else if (participationRepository.findByChallengeAndUser(challenge, user).size() > 0) {
            throw new AlreadyParticipatedException("Already participated challenge.");
        }
        else if (!LocalDateTimeUtils.isValidStartDate(challenge.getStartDate())) {
            throw new InvalidDateTimeException("Already started challenge.");
        }
        Participation participation = Participation.builder()
                .user(user)
                .challenge(challenge)
                .build();
        participationRepository.save(participation);
    }

    private boolean isValidAuthType(String authType) {
        return authType.equals("none") || authType.equals("feature") || authType.equals("classifi") || authType.equals("step");
    }

    private boolean isDuplicatedTopicPeriod(LocalDate startDate, LocalDate endDate, String challengeTopic) {
        List<Challenge> challengeList = challengeRepositorySupport.getRankingChallengeTopicPeriod(startDate, endDate, challengeTopic);
        return challengeList.size() > 0;
    }
}
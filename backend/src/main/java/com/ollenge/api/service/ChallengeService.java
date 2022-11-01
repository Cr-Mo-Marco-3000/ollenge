package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.api.response.data.ChallengeInfoData;
import com.ollenge.api.response.data.ChallengeStateData;
import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.*;
import com.ollenge.db.repository.*;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
            if (isDuplicatedTopicPeriod(User.builder().userId(challengePostReq.getUserId()).build(), challengePostReq.getStartDate(), challengePostReq.getEndDate(), challengePreset)) {
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

    public void participateChallenge(ChallengeParticipationPostReq challengeParticipationPostReq) throws NoSuchElementException, DuplicatedPeriodTopicRankingChallengeException, InvalidChallengeIdException, InvalidParticipationException, InvalidDateTimeException, InvalidInviteCodeException {
        Challenge challenge = challengeRepository.findById(challengeParticipationPostReq.getChallengeId())
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeParticipationPostReq.getChallengeId()); });
        User user = User.builder().userId(challengeParticipationPostReq.getUserId()).build();
        
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
        Participation participation = Participation.builder()
                .user(user)
                .challenge(challenge)
                .build();
        participationRepository.save(participation);
    }

    @Transactional
    public void giveUpChallenge(long challengeId, long userId) throws NoSuchElementException, InvalidChallengeIdException, InvalidParticipationException, InvalidDateTimeException {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });
        User user = User.builder().userId(userId).build();

        if (participationRepository.findByChallengeAndUser(challenge, user).isEmpty()) {
            throw new InvalidParticipationException("Not in challenge.");
        }
        else if (!LocalDateTimeUtils.isValidStartDate(challenge.getStartDate())) {
            throw new InvalidDateTimeException("Already started challenge.");
        }

        participationRepository.deleteByChallengeAndUser(challenge, user);
        if (participationRepository.findByChallenge(challenge).isEmpty()) {
            challengeRepository.delete(challenge);
        }
    }

    public ChallengeInfoData getChallengeInfo(long challengeId) throws InvalidChallengeIdException {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });

        ClassificationType classificationType = null;
        if (challenge.getAuthType().equals("classifi")) {
            AuthClassification authClassification = authClassificationRepository.findByChallenge(challenge);
            classificationType = authClassification.getClassificationType();
        }
        return ChallengeInfoData.of(challenge, classificationType);
    }

    public List<ChallengeStateData> getChallengeState(long challengeId) throws InvalidChallengeIdException {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + challengeId); });
        return challengeRepositorySupport.getChallengeState(challenge);
    }

    private boolean isValidAuthType(String authType) {
        return authType.equals("none") || authType.equals("feature") || authType.equals("classifi") || authType.equals("step");
    }

    private boolean isDuplicatedTopicPeriod(User user, LocalDate startDate, LocalDate endDate, ChallengePreset challengePreset) {
        List<Challenge> challengeList = challengeRepositorySupport.getRankingChallengeTopicPeriod(user, startDate, endDate, challengePreset);
        return !challengeList.isEmpty();
    }
}

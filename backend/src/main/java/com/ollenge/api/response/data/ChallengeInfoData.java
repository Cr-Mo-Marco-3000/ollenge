package com.ollenge.api.response.data;

import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.ClassificationType;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class ChallengeInfoData {

    long challengeId;
    boolean isRankingChallenge;
    String challengeImg;
    String challengeName;
    String challengeTopic;
    String authType;
    LocalDate startDate;
    LocalDate endDate;
    LocalTime startTime;
    LocalTime endTime;
    String inviteCode;
    String rewardContent;
    String penaltyContent;
    int challengeScore;
    String challengeDescription;
    ClassificationType classificationType;

    public static ChallengeInfoData of(Challenge challenge, ClassificationType classificationType) {
        ChallengeInfoData challengeInfoData = new ChallengeInfoData();
        challengeInfoData.challengeId = challenge.getChallengeId();
        challengeInfoData.isRankingChallenge = (challenge.getChallengePreset() != null);
        challengeInfoData.challengeImg = challenge.getChallengeImg();
        challengeInfoData.challengeName = challenge.getChallengeName();
        challengeInfoData.challengeTopic = challenge.getChallengeTopic();
        challengeInfoData.authType = challenge.getAuthType();
        challengeInfoData.startDate = challenge.getStartDate();
        challengeInfoData.endDate = challenge.getEndDate();
        challengeInfoData.startTime = challenge.getStartTime();
        challengeInfoData.endTime = challenge.getEndTime();
        challengeInfoData.inviteCode = challenge.getInviteCode();
        challengeInfoData.rewardContent = challenge.getRewardContent();
        challengeInfoData.penaltyContent = challenge.getPenaltyContent();
        challengeInfoData.challengeScore = challenge.getChallengeScore();
        challengeInfoData.challengeDescription = challenge.getChallengeDescription();
        challengeInfoData.classificationType = classificationType;
        return challengeInfoData;
    }
}

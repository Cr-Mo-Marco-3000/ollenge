package com.ollenge.api.response.data;

import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.ChallengeResult;
import com.ollenge.db.entity.Participation;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class UserCompletedChallengeData {

    long challengeId;
    String challengeImg;
    String challengeName;
    String challengeTopic;
    LocalDate startDate;
    LocalDate endDate;
    int peopleCnt;
    int challengeScore;
    Integer totalCnt;
    Integer challengeRank;
    int myFeedCnt;
    Boolean isChecked;

    public static UserCompletedChallengeData of(Challenge challenge, Participation participation, ChallengeResult challengeResult) {
        UserCompletedChallengeData userParticipatedChallengeData = new UserCompletedChallengeData();
        userParticipatedChallengeData.challengeId = challenge.getChallengeId();
        userParticipatedChallengeData.challengeImg = challenge.getChallengeImg();
        userParticipatedChallengeData.challengeName = challenge.getChallengeName();
        userParticipatedChallengeData.challengeTopic = challenge.getChallengeTopic();
        userParticipatedChallengeData.startDate = challenge.getStartDate();
        userParticipatedChallengeData.endDate = challenge.getEndDate();
        userParticipatedChallengeData.peopleCnt = challenge.getPeopleCnt();
        userParticipatedChallengeData.challengeScore = challenge.getChallengeScore();
        if(challengeResult != null) {
            userParticipatedChallengeData.totalCnt = challengeResult.getTotalCnt();
            userParticipatedChallengeData.challengeRank = challengeResult.getChallengeRank();
        }
        userParticipatedChallengeData.myFeedCnt = participation.getFeedCnt();
        userParticipatedChallengeData.isChecked = participation.isCheckedFlag();
        return userParticipatedChallengeData;
    }
}

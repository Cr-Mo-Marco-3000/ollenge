package com.ollenge.api.response.data;

import com.ollenge.db.entity.Challenge;
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
public class UserParticipatedChallengeData {

    long challengeId;
    String challengeImg;
    String challengeName;
    String challengeTopic;
    LocalDate startDate;
    LocalDate endDate;
    int peopleCnt;
//    boolean todayAuthStat;

    public static UserParticipatedChallengeData of(Challenge challenge) {
        UserParticipatedChallengeData userParticipatedChallengeData = new UserParticipatedChallengeData();
        userParticipatedChallengeData.challengeId = challenge.getChallengeId();
        userParticipatedChallengeData.challengeImg = challenge.getChallengeImg();
        userParticipatedChallengeData.challengeName = challenge.getChallengeName();
        userParticipatedChallengeData.challengeTopic = challenge.getChallengeTopic();
        userParticipatedChallengeData.startDate = challenge.getStartDate();
        userParticipatedChallengeData.endDate = challenge.getEndDate();
        userParticipatedChallengeData.peopleCnt = challenge.getPeopleCnt();
        return userParticipatedChallengeData;
    }
}

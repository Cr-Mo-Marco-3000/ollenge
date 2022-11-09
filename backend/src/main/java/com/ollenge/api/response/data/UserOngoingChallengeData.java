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
public class UserOngoingChallengeData {

    long challengeId;
    String challengeImg;
    String challengeName;
    String challengeTopic;
    LocalDate startDate;
    LocalDate endDate;
    int peopleCnt;
    boolean todayAuthStat;

    public static UserOngoingChallengeData of(Challenge challenge, boolean todayAuthStat) {
        UserOngoingChallengeData userOngoingChallengeData = new UserOngoingChallengeData();
        userOngoingChallengeData.challengeId = challenge.getChallengeId();
        userOngoingChallengeData.challengeImg = challenge.getChallengeImg();
        userOngoingChallengeData.challengeName = challenge.getChallengeName();
        userOngoingChallengeData.challengeTopic = challenge.getChallengeTopic();
        userOngoingChallengeData.startDate = challenge.getStartDate();
        userOngoingChallengeData.endDate = challenge.getEndDate();
        userOngoingChallengeData.peopleCnt = challenge.getPeopleCnt();
        userOngoingChallengeData.todayAuthStat = todayAuthStat;
        return userOngoingChallengeData;
    }
}

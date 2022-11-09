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
public class UserScheduledChallengeData {

    long challengeId;
    String challengeImg;
    String challengeName;
    String challengeTopic;
    LocalDate startDate;
    LocalDate endDate;
    int peopleCnt;

    public static UserScheduledChallengeData of(Challenge challenge) {
        UserScheduledChallengeData userScheduledChallengeData = new UserScheduledChallengeData();
        userScheduledChallengeData.challengeId = challenge.getChallengeId();
        userScheduledChallengeData.challengeImg = challenge.getChallengeImg();
        userScheduledChallengeData.challengeName = challenge.getChallengeName();
        userScheduledChallengeData.challengeTopic = challenge.getChallengeTopic();
        userScheduledChallengeData.startDate = challenge.getStartDate();
        userScheduledChallengeData.endDate = challenge.getEndDate();
        userScheduledChallengeData.peopleCnt = challenge.getPeopleCnt();
        return userScheduledChallengeData;
    }
}

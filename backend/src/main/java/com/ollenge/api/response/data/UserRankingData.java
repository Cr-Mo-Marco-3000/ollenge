package com.ollenge.api.response.data;

import com.ollenge.db.entity.Challenge;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class UserRankingData {

    long challengeId;
    String challengeName;
    String challengeImg;
    int challengeScore;

    public static UserRankingData of(Challenge challenge) {
        UserRankingData userRankingData = new UserRankingData();
        userRankingData.challengeId = challenge.getChallengeId();
        userRankingData.challengeName = challenge.getChallengeName();
        userRankingData.challengeImg = challenge.getChallengeImg();
        userRankingData.challengeScore = challenge.getChallengeScore();

        return userRankingData;
    }

}

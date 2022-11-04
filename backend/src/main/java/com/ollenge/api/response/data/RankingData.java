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
public class RankingData {

    long challengeId;
    String challengeName;
    String challengeImg;
    int challengeScore;

    public static RankingData of(Challenge challenge) {
        RankingData rankingData = new RankingData();
        rankingData.challengeId = challenge.getChallengeId();
        rankingData.challengeName = challenge.getChallengeName();
        rankingData.challengeImg = challenge.getChallengeImg();
        rankingData.challengeScore = challenge.getChallengeScore();

        return rankingData;
    }

}

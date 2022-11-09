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
public class ChallengeRankingData {

    long challengeId;
    String challengeName;
    String challengeImg;
    int challengeScore;
    int rank;

    public static ChallengeRankingData of(Challenge challenge, int rank) {
        ChallengeRankingData challengeRankingData = new ChallengeRankingData();
        challengeRankingData.challengeId = challenge.getChallengeId();
        challengeRankingData.challengeName = challenge.getChallengeName();
        challengeRankingData.challengeImg = challenge.getChallengeImg();
        challengeRankingData.challengeScore = challenge.getChallengeScore();
        challengeRankingData.rank = rank;

        return challengeRankingData;
    }

}

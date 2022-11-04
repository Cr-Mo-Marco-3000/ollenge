package com.ollenge.api.response.data;

import com.ollenge.db.entity.Challenge;

public class UserRankData {

    long challengeId;
    String challengeName;
    String challengeImg;
    int challengeScore;
    int rank;

    public static UserRankData of(Challenge challenge, int rank) {
        UserRankData userRankData = new UserRankData();
        userRankData.challengeId = challenge.getChallengeId();
        userRankData.challengeName = challenge.getChallengeName();
        userRankData.challengeImg = challenge.getChallengeImg();
        userRankData.challengeScore = challenge.getChallengeScore();
        userRankData.rank = rank;

        return userRankData;
    }
}

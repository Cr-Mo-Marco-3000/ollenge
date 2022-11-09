package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeRankingData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChallengeRankingGetRes extends BaseResponseBody {

    ChallengeRankingData userRanking;
    List<ChallengeRankingData> rankingList;

    public static ChallengeRankingGetRes of(int status, String message, ChallengeRankingData userRankData, List<ChallengeRankingData> rankingList) {
        ChallengeRankingGetRes challengeRankingGetRes = new ChallengeRankingGetRes();
        challengeRankingGetRes.setMessage(message);
        challengeRankingGetRes.setStatusCode(status);
        challengeRankingGetRes.setUserRanking(userRankData);
        challengeRankingGetRes.setRankingList(rankingList);

        return challengeRankingGetRes;
    }


}

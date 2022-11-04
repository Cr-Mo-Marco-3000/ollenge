package com.ollenge.api.response;

import com.ollenge.api.response.data.RankingData;
import com.ollenge.api.response.data.UserRankData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChallengeRankingGetRes extends BaseResponseBody {

    UserRankData userRank;
    List<RankingData> rankingList;

    public static ChallengeRankingGetRes of(int status, String message, UserRankData userRankData, List<RankingData> rankingList) {
        ChallengeRankingGetRes challengeRankingGetRes = new ChallengeRankingGetRes();
        challengeRankingGetRes.setMessage(message);
        challengeRankingGetRes.setStatusCode(status);
        challengeRankingGetRes.setUserRank(userRankData);
        challengeRankingGetRes.setRankingList(rankingList);

        return challengeRankingGetRes;
    }


}

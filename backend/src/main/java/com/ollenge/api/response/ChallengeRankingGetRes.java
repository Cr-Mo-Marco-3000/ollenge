package com.ollenge.api.response;

import com.ollenge.api.response.data.UserRankingData;
import com.ollenge.api.response.data.UserRankData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChallengeRankingGetRes extends BaseResponseBody {

    UserRankData userRank;
    List<UserRankingData> rankingList;

    public static ChallengeRankingGetRes of(int status, String message, UserRankData userRankData, List<UserRankingData> rankingList) {
        ChallengeRankingGetRes challengeRankingGetRes = new ChallengeRankingGetRes();
        challengeRankingGetRes.setMessage(message);
        challengeRankingGetRes.setStatusCode(status);
        challengeRankingGetRes.setUserRank(userRankData);
        challengeRankingGetRes.setRankingList(rankingList);

        return challengeRankingGetRes;
    }


}

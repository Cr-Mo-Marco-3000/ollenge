package com.ollenge.api.response;

import com.ollenge.api.response.data.TotalUserRankData;
import com.ollenge.api.response.data.UserRankData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TotalUserRankGetRes extends BaseResponseBody {
    TotalUserRankData userRank;
    List<TotalUserRankData> rankingList;

    public static TotalUserRankGetRes of(int status, String message, TotalUserRankData userRank, List<TotalUserRankData> totalRankingList) {
        TotalUserRankGetRes totalUserRankGetRes = new TotalUserRankGetRes();
        totalUserRankGetRes.setMessage(message);
        totalUserRankGetRes.setStatusCode(status);
        totalUserRankGetRes.setUserRank(userRank);
        totalUserRankGetRes.setRankingList(totalRankingList);

        return totalUserRankGetRes;
    }


}
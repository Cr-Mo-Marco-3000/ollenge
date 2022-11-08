package com.ollenge.api.response;

import com.ollenge.api.response.data.UserCompletedChallengeData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserCompletedGetRes extends BaseResponseBody {

    List<UserCompletedChallengeData> rankingChallengeList;
    List<UserCompletedChallengeData> userChallengeList;

    public static UserCompletedGetRes of(int status, String msg, List<UserCompletedChallengeData> rankingChallengeList, List<UserCompletedChallengeData> userChallengeList) {
        UserCompletedGetRes challengeInfoGetRes = new UserCompletedGetRes();
        challengeInfoGetRes.setStatusCode(status);
        challengeInfoGetRes.setMessage(msg);
        challengeInfoGetRes.rankingChallengeList = rankingChallengeList;
        challengeInfoGetRes.userChallengeList = userChallengeList;

        return challengeInfoGetRes;
    }
}

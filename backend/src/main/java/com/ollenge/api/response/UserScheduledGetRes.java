package com.ollenge.api.response;

import com.ollenge.api.response.data.UserScheduledChallengeData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserScheduledGetRes extends BaseResponseBody {

    List<UserScheduledChallengeData> rankingChallengeList;
    List<UserScheduledChallengeData> userChallengeList;

    public static UserScheduledGetRes of(int status, String msg, List<UserScheduledChallengeData> rankingChallengeList, List<UserScheduledChallengeData> userChallengeList) {
        UserScheduledGetRes challengeInfoGetRes = new UserScheduledGetRes();
        challengeInfoGetRes.setStatusCode(status);
        challengeInfoGetRes.setMessage(msg);
        challengeInfoGetRes.rankingChallengeList = rankingChallengeList;
        challengeInfoGetRes.userChallengeList = userChallengeList;

        return challengeInfoGetRes;
    }
}

package com.ollenge.api.response;

import com.ollenge.api.response.data.UserOngoingChallengeData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserOngoingGetRes extends BaseResponseBody {

    List<UserOngoingChallengeData> rankingChallengeList;
    List<UserOngoingChallengeData> userChallengeList;

    public static UserOngoingGetRes of(int status, String msg, List<UserOngoingChallengeData> rankingChallengeList, List<UserOngoingChallengeData> userChallengeList) {
        UserOngoingGetRes challengeInfoGetRes = new UserOngoingGetRes();
        challengeInfoGetRes.setStatusCode(status);
        challengeInfoGetRes.setMessage(msg);
        challengeInfoGetRes.rankingChallengeList = rankingChallengeList;
        challengeInfoGetRes.userChallengeList = userChallengeList;

        return challengeInfoGetRes;
    }
}

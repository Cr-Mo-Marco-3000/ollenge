package com.ollenge.api.response;

import com.ollenge.api.response.data.UserParticipatedChallengeData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserChallengeGetRes extends BaseResponseBody {

    List<UserParticipatedChallengeData> rankingChallengeList;
    List<UserParticipatedChallengeData> userChallengeList;

    public static UserChallengeGetRes of(int status, String msg, List<UserParticipatedChallengeData> rankingChallengeList, List<UserParticipatedChallengeData> userChallengeList) {
        UserChallengeGetRes challengeInfoGetRes = new UserChallengeGetRes();
        challengeInfoGetRes.setStatusCode(status);
        challengeInfoGetRes.setMessage(msg);
        challengeInfoGetRes.rankingChallengeList = rankingChallengeList;
        challengeInfoGetRes.userChallengeList = userChallengeList;

        return challengeInfoGetRes;
    }
}

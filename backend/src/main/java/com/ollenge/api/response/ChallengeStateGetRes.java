package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeStateData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChallengeStateGetRes extends BaseResponseBody {

    List<ChallengeStateData> challengeStateList;

    public static ChallengeStateGetRes of(int status, String msg, List<ChallengeStateData> challengeStateList) {
        ChallengeStateGetRes challengeStateGetRes = new ChallengeStateGetRes();
        challengeStateGetRes.setStatusCode(status);
        challengeStateGetRes.setMessage(msg);
        challengeStateGetRes.challengeStateList = challengeStateList;

        return challengeStateGetRes;
    }
}

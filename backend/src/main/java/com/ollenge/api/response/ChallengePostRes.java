package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengePostRes extends BaseResponseBody {

    ChallengeCreatedData challengeCreatedData;

    public static ChallengePostRes of(int status, String msg, ChallengeCreatedData challengeCreatedData) {
        ChallengePostRes challengePostRes = new ChallengePostRes();
        challengePostRes.setStatusCode(status);
        challengePostRes.setMessage(msg);
        challengePostRes.challengeCreatedData = challengeCreatedData;

        return challengePostRes;
    }
}

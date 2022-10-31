package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeInfoData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeInfoGetRes extends BaseResponseBody {

    ChallengeInfoData challengeInfoData;

    public static ChallengeInfoGetRes of(int status, String msg, ChallengeInfoData challengeInfoData) {
        ChallengeInfoGetRes challengePostRes = new ChallengeInfoGetRes();
        challengePostRes.setStatusCode(status);
        challengePostRes.setMessage(msg);
        challengePostRes.challengeInfoData = challengeInfoData;

        return challengePostRes;
    }
}

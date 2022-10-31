package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeInfoData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeInfoGetRes extends BaseResponseBody {

    ChallengeInfoData challengeInfoList;

    public static ChallengeInfoGetRes of(int status, String msg, ChallengeInfoData challengeInfoList) {
        ChallengeInfoGetRes challengeInfoGetRes = new ChallengeInfoGetRes();
        challengeInfoGetRes.setStatusCode(status);
        challengeInfoGetRes.setMessage(msg);
        challengeInfoGetRes.challengeInfoList = challengeInfoList;

        return challengeInfoGetRes;
    }
}

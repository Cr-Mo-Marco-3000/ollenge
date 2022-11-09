package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengePresetData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ChallengePresetOngoingGetRes extends BaseResponseBody {

    LocalDate startDate;
    LocalDate endDate;
    List<ChallengePresetData> challengePresetList;

    public static ChallengePresetOngoingGetRes of(int status, String message, LocalDate startDate, LocalDate endDate, List<ChallengePresetData> challengePresetList) {
        ChallengePresetOngoingGetRes challengePresetOngoingGetRes = new ChallengePresetOngoingGetRes();
        challengePresetOngoingGetRes.setStatusCode(status);
        challengePresetOngoingGetRes.setMessage(message);
        challengePresetOngoingGetRes.setStartDate(startDate);
        challengePresetOngoingGetRes.setEndDate(endDate);
        challengePresetOngoingGetRes.setChallengePresetList(challengePresetList);

        return challengePresetOngoingGetRes;
    }

}

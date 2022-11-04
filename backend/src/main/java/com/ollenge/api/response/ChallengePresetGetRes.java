package com.ollenge.api.response;

import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.db.entity.ChallengePreset;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ChallengePresetGetRes extends BaseResponseBody {

    LocalDate startDate;
    LocalDate endDate;
    List<ChallengePreset> challengePresetList;

    public static ChallengePresetGetRes of(int status, String message, LocalDate startDate, LocalDate endDate, List<ChallengePreset> challengePresetList) {
        ChallengePresetGetRes challengePresetGetRes = new ChallengePresetGetRes();
        challengePresetGetRes.setStatusCode(status);
        challengePresetGetRes.setMessage(message);
        challengePresetGetRes.setStartDate(startDate);
        challengePresetGetRes.setEndDate(endDate);
        challengePresetGetRes.setChallengePresetList(challengePresetList);

        return challengePresetGetRes;
    }

}

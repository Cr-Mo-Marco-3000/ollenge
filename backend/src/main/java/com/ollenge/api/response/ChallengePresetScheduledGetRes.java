package com.ollenge.api.response;

import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.db.entity.ChallengePreset;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ChallengePresetScheduledGetRes extends BaseResponseBody {

    LocalDate startDate;
    LocalDate endDate;
    List<ChallengePreset> challengePresetList;

    public static ChallengePresetScheduledGetRes of(int status, String message, LocalDate startDate, LocalDate endDate, List<ChallengePreset> challengePresetList) {
        ChallengePresetScheduledGetRes challengePresetScheduledGetRes = new ChallengePresetScheduledGetRes();
        challengePresetScheduledGetRes.setStatusCode(status);
        challengePresetScheduledGetRes.setMessage(message);
        challengePresetScheduledGetRes.setStartDate(startDate);
        challengePresetScheduledGetRes.setEndDate(endDate);
        challengePresetScheduledGetRes.setChallengePresetList(challengePresetList);

        return challengePresetScheduledGetRes;
    }

}

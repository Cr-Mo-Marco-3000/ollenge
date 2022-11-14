package com.ollenge.api.response.data;

import com.ollenge.db.entity.ChallengePreset;
import com.ollenge.db.entity.ClassificationType;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class ChallengePresetData {

    long challengePresetID;
    String presetImg;
    LocalTime startTime;
    LocalTime endTime;
    String presetTopic;
    String authType;
    Integer stepCount;
    ClassificationType classificationType;
    String presetDescription;
    boolean isParticipated;

    public static ChallengePresetData of(ChallengePreset challengePreset, boolean isParticipated) {
        ChallengePresetData challengeInfoData = new ChallengePresetData();
        challengeInfoData.challengePresetID = challengePreset.getChallengePresetId();
        challengeInfoData.presetImg = challengePreset.getPresetImg();
        challengeInfoData.startTime = challengePreset.getStartTime();
        challengeInfoData.endTime = challengePreset.getEndTime();
        challengeInfoData.presetTopic = challengePreset.getPresetTopic();
        challengeInfoData.authType = challengePreset.getAuthType();
        challengeInfoData.stepCount = challengePreset.getStepCount();
        challengeInfoData.classificationType = challengePreset.getClassificationType();
        challengeInfoData.presetDescription = challengePreset.getPresetDescription();
        challengeInfoData.isParticipated = isParticipated;
        return challengeInfoData;
    }
}

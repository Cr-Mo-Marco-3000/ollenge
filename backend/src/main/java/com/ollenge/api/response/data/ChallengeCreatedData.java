package com.ollenge.api.response.data;

import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class ChallengeCreatedData {

    long challengeId;
    String inviteCode;

    public static ChallengeCreatedData of(long challengeId,
                                 String inviteCode) {
        ChallengeCreatedData challengeCreatedData = new ChallengeCreatedData();
        challengeCreatedData.challengeId = challengeId;
        challengeCreatedData.inviteCode = inviteCode;
        return challengeCreatedData;
    }
}

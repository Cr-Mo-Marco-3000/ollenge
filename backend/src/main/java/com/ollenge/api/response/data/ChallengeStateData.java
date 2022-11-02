package com.ollenge.api.response.data;

import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class ChallengeStateData {

    long userId;
    String nickname;
    String profileImg;
    List<LocalDateTime> datetimeList;

    public static ChallengeStateData of(long userId, String nickname, String profileImg, List<LocalDateTime> datetimeList) {
        ChallengeStateData challengeStateData = new ChallengeStateData();
        challengeStateData.userId = userId;
        challengeStateData.nickname = nickname;
        challengeStateData.profileImg = profileImg;
        challengeStateData.datetimeList = datetimeList;
        return challengeStateData;
    }
}

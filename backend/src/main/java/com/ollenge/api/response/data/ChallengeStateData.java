package com.ollenge.api.response.data;

import com.ollenge.db.entity.User;
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
    String userDescription;
    List<LocalDateTime> datetimeList;
    BadgeGetData selectedBadge;

    public static ChallengeStateData of(User user, List<LocalDateTime> datetimeList) {
        ChallengeStateData challengeStateData = new ChallengeStateData();
        challengeStateData.userId = user.getUserId();
        challengeStateData.nickname = user.getNickname();
        challengeStateData.profileImg = user.getProfileImg();
        challengeStateData.userDescription = user.getUserDescription();
        challengeStateData.datetimeList = datetimeList;
        if(user.getBadge() != null) {
            challengeStateData.selectedBadge = new BadgeGetData();
            challengeStateData.selectedBadge.setBadgeId(user.getBadge().getBadgeId());
            challengeStateData.selectedBadge.setType(user.getBadge().getType());
            challengeStateData.selectedBadge.setGrade(user.getBadge().getGrade());
            challengeStateData.selectedBadge.setCreatedDatetime(user.getBadge().getCreatedDatetime());
            challengeStateData.selectedBadge.setBadgeFlag(user.getBadge().isBadgeFlag());
        } else {
            challengeStateData.selectedBadge = null;
        }
        return challengeStateData;
    }
}

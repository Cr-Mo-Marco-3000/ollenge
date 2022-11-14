package com.ollenge.api.response.data;

import com.ollenge.db.entity.User;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class TotalUserRankData {

    long userId;
    String nickname;
    String profileImg;
    int userScore;
    int rank;
    BadgeGetData selectedBadge;


    public static TotalUserRankData of(User user, int i) {
        TotalUserRankData totalUserRankData = new TotalUserRankData();
        totalUserRankData.userId = user.getUserId();
        totalUserRankData.nickname = user.getNickname();
        totalUserRankData.profileImg = user.getProfileImg();
        totalUserRankData.userScore = user.getUserScore();
        totalUserRankData.rank = i;
        if(user.getBadge() != null) {
            totalUserRankData.selectedBadge = new BadgeGetData();
            totalUserRankData.selectedBadge.setBadgeId(user.getBadge().getBadgeId());
            totalUserRankData.selectedBadge.setType(user.getBadge().getType());
            totalUserRankData.selectedBadge.setGrade(user.getBadge().getGrade());
            totalUserRankData.selectedBadge.setCreatedDatetime(user.getBadge().getCreatedDatetime());
            totalUserRankData.selectedBadge.setBadgeFlag(user.getBadge().isBadgeFlag());
        } else {
            totalUserRankData.selectedBadge = null;
        }

        return totalUserRankData;
    }
}
package com.ollenge.api.response;

import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserGetRes extends BaseResponseBody {

    long userId;
    String authCode;
    String nickname;
    String profileImg;
    String loginType;
    String userDescription;
    int userScore;
    BadgeGetData selectedBadge;

    public static UserGetRes of(Integer statusCode, String message, User user) {
        UserGetRes response = new UserGetRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setUserId(user.getUserId());
        response.setAuthCode(user.getAuthCode());
        response.setNickname(user.getNickname());
        response.setProfileImg(user.getProfileImg());
        response.setLoginType(user.getLoginType());
        response.setUserDescription(user.getUserDescription());
        response.setUserScore(user.getUserScore());
        if(user.getBadge() != null) {
            response.selectedBadge = new BadgeGetData();
            response.selectedBadge.setBadgeId(user.getBadge().getBadgeId());
            response.selectedBadge.setType(user.getBadge().getType());
            response.selectedBadge.setGrade(user.getBadge().getGrade());
            response.selectedBadge.setCreatedDatetime(user.getBadge().getCreatedDatetime());
            response.selectedBadge.setBadgeFlag(user.getBadge().isBadgeFlag());
        } else {
            response.selectedBadge = null;
        }
        return response;
    }
}

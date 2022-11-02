package com.ollenge.api.response;

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

    public static UserGetRes of(Integer statusCode, String message, User user) {
        UserGetRes response = new UserGetRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setAuthCode(user.getAuthCode());
        response.setNickname(user.getNickname());
        response.setProfileImg(user.getProfileImg());
        response.setLoginType(user.getLoginType());
        response.setUserDescription(user.getUserDescription());
        response.setUserScore(user.getUserScore());
        return response;
    }
}

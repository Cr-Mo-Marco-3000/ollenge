package com.ollenge.api.response;

import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginGetRes extends BaseResponseBody {
    String accessToken; // JWT 인증 토큰
    boolean userFlag; // 회원 정보(닉네임, 사진) 입력 여부

    public static UserLoginGetRes of(String message, Integer statusCode, String accessToken, boolean userFlag) {
        UserLoginGetRes response = new UserLoginGetRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setAccessToken(accessToken);
        response.setUserFlag(userFlag);
        return response;
    }
}

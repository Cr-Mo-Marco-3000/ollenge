package com.ollenge.api.response;

import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostRes extends BaseResponseBody {
    String accessToken; // JWT 인증 토큰

    public static UserLoginPostRes of(String message, Integer statusCode, String accessToken) {
        UserLoginPostRes response = new UserLoginPostRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setAccessToken(accessToken);
        return response;
    }
}

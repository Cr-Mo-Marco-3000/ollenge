package com.ollenge.api.controller;

import com.ollenge.api.response.UserLoginGetRes;
import com.ollenge.api.service.OAuthService;
import com.ollenge.api.service.UserService;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @Autowired
    OAuthService oAuthService;

    @Autowired
    UserService userService;

    @GetMapping("/kakao")
    public ResponseEntity<UserLoginGetRes> kakaoLogin(@RequestParam String code) {
        long userId;
        String authCode;
        User user;
        boolean userFlag;

        try {
            String token = oAuthService.getKakaoAccessToken(code);
            JSONObject jsonObject = oAuthService.getKakaoUser(token);
            jsonObject.put("login_type", "kakao");
            authCode = jsonObject.getString("id");
            // 존재하지 않으면 회원가입
            if (!oAuthService.checkUser(jsonObject)) {
                oAuthService.createUser(jsonObject);
            }

            userId = userService.getUserIdByAuthCode(authCode);
            user = userService.getUserByUserId(userId);
            userFlag = user.isUserFlag();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(UserLoginGetRes.of("카카오 로그인 실패", 400, null, false));
        }

        return ResponseEntity.status(200).body(UserLoginGetRes.of("카카오 로그인 성공", 200, JwtTokenUtil.getToken(Long.toString(userId)), userFlag));
    }

    @GetMapping("/google")
    public ResponseEntity<UserLoginGetRes> googleLogin(@RequestParam String accessToken) {
        long userId;
        String authCode;
        User user;
        boolean userFlag;

        try {
            JSONObject jsonObject = oAuthService.getGoogleUser(accessToken);
            System.out.println(jsonObject);
            jsonObject.put("login_type", "google");
            authCode = jsonObject.getString("id");
            // 존재하지 않으면 회원가입
            if (!oAuthService.checkUser(jsonObject)) {
                oAuthService.createUser(jsonObject);
            }

            userId = userService.getUserIdByAuthCode(authCode);
            user = userService.getUserByUserId(userId);
            userFlag = user.isUserFlag();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(UserLoginGetRes.of("구글 로그인 실패", 400, null, false));
        }

        return ResponseEntity.status(200).body(UserLoginGetRes.of("구글 로그인 성공", 200, JwtTokenUtil.getToken(Long.toString(userId)), userFlag));
    }

}

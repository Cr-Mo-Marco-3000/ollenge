package com.ollenge.api.controller;

import com.ollenge.api.response.UserLoginPostRes;
import com.ollenge.api.service.OAuthService;
import com.ollenge.common.util.JwtTokenUtil;
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

    @GetMapping("/kakao")
    public ResponseEntity<UserLoginPostRes> kakaoLogin(@RequestParam String code) {
        String userId = "";
        System.out.println("kakao login test");
        System.out.println(code);

        try {
            String token = oAuthService.getKakaoAccessToken(code);
            JSONObject jsonObject = oAuthService.getKakaoUser(token);
            userId = jsonObject.getString("id");
            // 존재하지 않으면 회원가입
            if (!oAuthService.checkUser(jsonObject)) {
                oAuthService.createUser(jsonObject);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(UserLoginPostRes.of("카카오 로그인 실패", 400, null));
        }

        return ResponseEntity.status(200).body(UserLoginPostRes.of("카카오 로그인 성공", 200, JwtTokenUtil.getToken(userId)));
    }



}

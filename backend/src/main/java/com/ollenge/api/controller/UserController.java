package com.ollenge.api.controller;

import com.ollenge.api.response.UserLoginPostRes;
import com.ollenge.common.auth.OllengeUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/test")
    public ResponseEntity<UserLoginPostRes> test(Authentication authentication) {
        OllengeUserDetails userDetails = (OllengeUserDetails) authentication.getDetails();

        System.out.println(userDetails.getUsername()); // userId

        return ResponseEntity.status(200).body(UserLoginPostRes.of("테스트 성공", 200, "test"));
    }


}

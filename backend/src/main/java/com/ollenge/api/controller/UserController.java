package com.ollenge.api.controller;

import com.ollenge.api.exception.DuplicatedNicknameException;
import com.ollenge.api.exception.InvalidNicknameException;
import com.ollenge.api.exception.InvalidUserDescriptionException;
import com.ollenge.api.request.UserPostReq;
import com.ollenge.api.response.UserGetRes;
import com.ollenge.api.service.UserService;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 정보 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userService.getUserByUserId(userId);

        if (user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "권한이 없습니다."));

        return ResponseEntity.status(200).body(UserGetRes.of(200, "회원 정보 조회 성공", user));
    }

    @PatchMapping
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 정보 수정 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 400, message = "이미 존재하는 닉네임입니다"),
            @ApiResponse(code = 400, message = "형식에 맞지 않는 닉네임입니다"),
            @ApiResponse(code = 400, message = "입력 형식에 맞지 않습니다"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<BaseResponseBody> signup(@ApiIgnore Authentication authentication, @RequestBody UserPostReq userPostReq) {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userService.getUserByUserId(userId);

        if (user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "권한이 없습니다."));

        try {
            userService.updateUserInfo(user.getUserId(), userPostReq.getNickname(), userPostReq.getProfileImg(), userPostReq.getUserDescription());
        } catch (DuplicatedNicknameException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, e.getMessage()));
        } catch (InvalidNicknameException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, e.getMessage()));
        } catch (InvalidUserDescriptionException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, e.getMessage()));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 정보 수정 성공"));
    }


}

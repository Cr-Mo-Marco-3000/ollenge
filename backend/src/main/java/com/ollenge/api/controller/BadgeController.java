package com.ollenge.api.controller;

import com.ollenge.api.exception.InvalidBadgeException;
import com.ollenge.api.exception.InvalidBadgeStatusException;
import com.ollenge.api.exception.InvalidReqUserException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.BadgePatchReq;
import com.ollenge.api.response.BadgeGetRes;
import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.api.service.BadgeService;
import com.ollenge.api.service.UserService;
import com.ollenge.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/badge")
@AllArgsConstructor
public class BadgeController {

    private final UserService userService;
    private final BadgeService badgeService;


    @GetMapping("/{userId}")
    @ApiOperation(value = "뱃지 리스트 조회", notes = "뱃지 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "뱃지 리스트 조회 성공"),
            @ApiResponse(code = 400, message = "존재하지 않는 유저입니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getBadgeList(@ApiIgnore Authentication authentication, @PathVariable long userId) {
        try {
            List<BadgeGetData> badgeList = badgeService.getBadgeList(authentication, userId);
            return ResponseEntity.status(200).body(BadgeGetRes.of(200, "뱃지 리스트 조회 성공", badgeList));
        } catch (InvalidReqUserException invalidReqUserException) {
            invalidReqUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "존재하지 않는 유저입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @PatchMapping
    @ApiOperation(value = "뱃지 획득", notes = "뱃지를 획득 처리합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "뱃지 획득 성공"),
            @ApiResponse(code = 400, message = "요청한 뱃지가 존재하지 않습니다."),
            @ApiResponse(code = 400, message = "이미 획득한 뱃지 입니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 400, message = "입력 형식에 맞지 않습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> updateBadgeStatus(@ApiIgnore Authentication authentication, @Validated @RequestBody BadgePatchReq badgePatchReq,
                                                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            userService.updateBadgeStatus(authentication, badgePatchReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "뱃지 획득 성공"));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (InvalidBadgeStatusException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "이미 획득한 뱃지 입니다."));
        } catch (InvalidBadgeException invalidBadgeException) {
            invalidBadgeException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "요청한 뱃지가 존재하지 않습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

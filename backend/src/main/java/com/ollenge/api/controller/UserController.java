package com.ollenge.api.controller;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.BadgePatchReq;
import com.ollenge.api.request.ReportUserReq;
import com.ollenge.api.request.UserPostReq;
import com.ollenge.api.response.*;
import com.ollenge.api.response.data.TotalUserRankData;
import com.ollenge.api.response.data.UserCompletedChallengeData;
import com.ollenge.api.response.data.UserOngoingChallengeData;
import com.ollenge.api.response.data.UserScheduledChallengeData;
import com.ollenge.api.service.BadgeService;
import com.ollenge.api.service.UserService;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.User;
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
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final BadgeService badgeService;


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

    @GetMapping("/ongoing")
    @ApiOperation(value = "유저별 참여 중인 챌린지 조회", notes = "유저별 참여 중인 챌린지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저별 참여 중인 챌린지 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
  public ResponseEntity<? extends BaseResponseBody> getUserOngoingChallenge(@ApiIgnore Authentication authentication) {
        try {
            List<UserOngoingChallengeData> userChallengeList = userService.getUserOngoingUserChallenge(authentication);
            List<UserOngoingChallengeData> rankingChallengeList = userService.getUserOngoingRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserOngoingGetRes.of(200, "유저별 참여 중인 챌린지 조회 성공", rankingChallengeList, userChallengeList));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/scheduled")
    @ApiOperation(value = "유저별 참여 예정 챌린지 조회", notes = "유저별 참여 예정인 챌린지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저별 참여 예정 챌린지 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserScheduledChallenge(@ApiIgnore Authentication authentication) {
        try {
            List<UserScheduledChallengeData> userChallengeList = userService.getUserScheduledUserChallenge(authentication);
            List<UserScheduledChallengeData> rankingChallengeList = userService.getUserScheduledRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserScheduledGetRes.of(200, "유저별 참여 예정 챌린지 조회 성공", rankingChallengeList, userChallengeList));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/completed")
    @ApiOperation(value = "유저별 참여 완료 챌린지 조회", notes = "유저별 참여 완료인 챌린지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저별 참여 완료 챌린지 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserCompletedChallenge(@ApiIgnore Authentication authentication) {
        try {
            List<UserCompletedChallengeData> userChallengeList = userService.getUserCompletedUserChallenge(authentication);
            List<UserCompletedChallengeData> rankingChallengeList = userService.getUserCompletedRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserCompletedGetRes.of(200, "유저별 참여 완료 챌린지 조회 성공", rankingChallengeList, userChallengeList));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/ranking")
    @ApiOperation(value = "전체 유저 랭킹 조회", notes = "전체 유저 랭킹을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "전체 유저 랭킹 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserRanking(@ApiIgnore Authentication authentication) {
        try {
            List<TotalUserRankData> totalUserRankDataList = userService.getTotalUserRank(authentication);
            TotalUserRankData userRank = userService.getUserRank(authentication);
            return ResponseEntity.status(200).body(TotalUserRankGetRes.of(200, "유저별 참여 완료 챌린지 조회 성공", userRank,totalUserRankDataList));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @PatchMapping("/badge")
    @ApiOperation(value = "대표 뱃지 설정", notes = "대표 뱃지를 설정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "대표 뱃지 설정 성공"),
            @ApiResponse(code = 400, message = "요청한 뱃지가 존재하지 않습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 400, message = "입력 형식에 맞지 않습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> updateProfileBadge(@ApiIgnore Authentication authentication, @Validated @RequestBody BadgePatchReq badgePatchReq,
                                                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            userService.updateProfileBadge(authentication, badgePatchReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "대표 뱃지 설정 성공"));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (InvalidBadgeException invalidBadgeException) {
            invalidBadgeException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "요청한 뱃지가 존재하지 않습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }


    @PostMapping("/report")
    @ApiOperation(value = "유저 신고", notes = "유저를 신고합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저 신고 성공"),
            @ApiResponse(code = 400, message = "존재하지 않는 유저입니다."),
            @ApiResponse(code = 400, message = "입력형식에 맞지 않습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> reportUser(@ApiIgnore Authentication authentication, @Validated @RequestBody ReportUserReq reportUserReq,
                                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            userService.reportUser(authentication, reportUserReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저 신고 성공"));
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
}

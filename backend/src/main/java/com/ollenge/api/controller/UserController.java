package com.ollenge.api.controller;

import com.ollenge.api.exception.DuplicatedNicknameException;
import com.ollenge.api.exception.InvalidNicknameException;
import com.ollenge.api.exception.InvalidUserDescriptionException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.UserPostReq;
import com.ollenge.api.response.UserChallengeGetRes;
import com.ollenge.api.response.UserGetRes;
import com.ollenge.api.response.TotalUserRankGetRes;
import com.ollenge.api.response.data.TotalUserRankData;
import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.api.response.data.UserParticipatedChallengeData;
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
        List<BadgeGetData> badgeList = badgeService.getBadgeList(user);
        return ResponseEntity.status(200).body(UserGetRes.of(200, "회원 정보 조회 성공", user, badgeList));
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
            List<UserParticipatedChallengeData> userChallengeList = userService.getUserOngoingUserChallenge(authentication);
            List<UserParticipatedChallengeData> rankingChallengeList = userService.getUserOngoingRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserChallengeGetRes.of(200, "유저별 참여 중인 챌린지 조회 성공", rankingChallengeList, userChallengeList));
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
            List<UserParticipatedChallengeData> userChallengeList = userService.getUserScheduledUserChallenge(authentication);
            List<UserParticipatedChallengeData> rankingChallengeList = userService.getUserScheduledRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserChallengeGetRes.of(200, "유저별 참여 예정 챌린지 조회 성공", rankingChallengeList, userChallengeList));
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
            List<UserParticipatedChallengeData> userChallengeList = userService.getUserCompletedUserChallenge(authentication);
            List<UserParticipatedChallengeData> rankingChallengeList = userService.getUserCompletedRankingChallenge(authentication);
            return ResponseEntity.status(200).body(UserChallengeGetRes.of(200, "유저별 참여 완료 챌린지 조회 성공", rankingChallengeList, userChallengeList));
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
}

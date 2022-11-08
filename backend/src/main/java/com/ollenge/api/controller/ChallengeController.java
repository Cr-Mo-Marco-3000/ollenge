package com.ollenge.api.controller;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.response.ChallengeInfoGetRes;
import com.ollenge.api.response.ChallengePostRes;
import com.ollenge.api.response.ChallengePresetGetRes;
import com.ollenge.api.response.ChallengeStateGetRes;
import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.api.response.data.ChallengeInfoData;
import com.ollenge.api.response.data.ChallengeStateData;
import com.ollenge.api.service.ChallengeService;
import com.ollenge.api.service.UserService;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.ChallengePreset;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/challenge")
@AllArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    private final UserService userService;

    @PostMapping
    @ApiOperation(value = "챌린지 생성", notes = "챌린지를 생성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "챌린지가 생성되었습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 400, message = "챌린지 기간 설정이 유효하지 않습니다."),
            @ApiResponse(code = 400, message = "같은 기간과 주제를 가진 랭킹 챌린지에 참여하고 있습니다."),
            @ApiResponse(code = 400, message = "입력 형식에 맞지 않습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> createChallenge(@ApiIgnore Authentication authentication, @Validated @RequestBody ChallengePostReq challengePostReq,
                                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            ChallengeCreatedData challengeCreatedData = challengeService.createChallenge(authentication, challengePostReq);
            return ResponseEntity.status(200).body(ChallengePostRes.of(200, "챌린지가 생성되었습니다.", challengeCreatedData));
        } catch (InvalidDateTimeException invalidDateTimeException) {
            invalidDateTimeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "챌린지 기간 설정이 유효하지 않습니다."));
        } catch (DuplicatedPeriodTopicRankingChallengeException duplicatedPeriodTopicRankingChallengeException) {
            duplicatedPeriodTopicRankingChallengeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "같은 기간과 주제를 가진 랭킹 챌린지에 참여하고 있습니다."));
        } catch (NoSuchElementException | InvalidAuthTypeException | InvalidFieldException invalidFieldException) {
            invalidFieldException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @PostMapping("/participation")
    @ApiOperation(value = "챌린지 참여", notes = "챌린지에 참여합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "챌린지 참여 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 400, message = "해당하는 챌린지가 없습니다."),
            @ApiResponse(code = 400, message = "초대 코드가 일치하지 않습니다."),
            @ApiResponse(code = 400, message = "같은 기간과 주제를 가진 랭킹 챌린지에 참여하고 있습니다."),
            @ApiResponse(code = 400, message = "이미 참여하고 있는 챌린지입니다."),
            @ApiResponse(code = 400, message = "이미 시작한 챌린지 입니다."),
            @ApiResponse(code = 400, message = "입력 형식에 맞지 않습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> participateChallenge(@ApiIgnore Authentication authentication, @Validated @RequestBody ChallengeParticipationPostReq challengeParticipationPostReq,
                                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            challengeService.participateChallenge(authentication, challengeParticipationPostReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "챌린지 참여 성공"));
        } catch (InvalidChallengeIdException invalidChallengeIdException) {
            invalidChallengeIdException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 챌린지가 없습니다."));
        } catch (InvalidInviteCodeException invalidInviteCodeException) {
            invalidInviteCodeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "초대 코드가 일치하지 않습니다."));
        } catch (DuplicatedPeriodTopicRankingChallengeException duplicatedPeriodTopicRankingChallengeException) {
            duplicatedPeriodTopicRankingChallengeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "같은 기간과 주제를 가진 랭킹 챌린지에 참여하고 있습니다."));
        } catch (InvalidParticipationException alreadyParticipatedException) {
            alreadyParticipatedException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 참여하고 있는 챌린지입니다."));
        } catch (InvalidDateTimeException invalidDateTimeException) {
            invalidDateTimeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 시작한 챌린지 입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @DeleteMapping("/{challengeId}")
    @ApiOperation(value = "챌린지 포기", notes = "챌린지를 포기합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "챌린지 포기 성공"),
            @ApiResponse(code = 400, message = "해당하는 챌린지가 없습니다."),
            @ApiResponse(code = 400, message = "참여 중인 챌린지가 아닙니다."),
            @ApiResponse(code = 400, message = "이미 시작한 챌린지 입니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> giveUpChallenge(@ApiIgnore Authentication authentication, @PathVariable long challengeId) {
        try {
            challengeService.giveUpChallenge(authentication, challengeId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "챌린지 포기 성공"));
        } catch (InvalidChallengeIdException invalidChallengeIdException) {
            invalidChallengeIdException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 챌린지가 없습니다."));
        } catch (InvalidParticipationException invalidParticipationException) {
            invalidParticipationException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "참여 중인 챌린지가 아닙니다."));
        } catch (InvalidDateTimeException invalidDateTimeException) {
            invalidDateTimeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 시작한 챌린지 입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/{challengeId}")
    @ApiOperation(value = "챌린지 정보 조회", notes = "챌린지의 상세 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "챌린지 정보 조회 성공"),
            @ApiResponse(code = 400, message = "해당하는 챌린지가 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getChallengeInfo(@ApiIgnore Authentication authentication, @PathVariable long challengeId) {
        try {
            ChallengeInfoData challengeInfoData = challengeService.getChallengeInfo(authentication, challengeId);
            return ResponseEntity.status(200).body(ChallengeInfoGetRes.of(200, "챌린지 정보 조회 성공", challengeInfoData));
        } catch (InvalidChallengeIdException invalidChallengeIdException) {
            invalidChallengeIdException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 챌린지가 없습니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/state/{challengeId}")
    @ApiOperation(value = "챌린지 현황 조회", notes = "챌린지의 현황을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "챌린지 현황 조회 성공"),
            @ApiResponse(code = 400, message = "해당하는 챌린지가 없습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getChallengeState(@ApiIgnore Authentication authentication, @PathVariable long challengeId) {
        try {
            List<ChallengeStateData> challengeStateList = challengeService.getChallengeState(authentication, challengeId);
            return ResponseEntity.status(200).body(ChallengeStateGetRes.of(200, "챌린지 현황 조회 성공", challengeStateList));
        } catch (InvalidChallengeIdException invalidChallengeIdException) {
            invalidChallengeIdException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 챌린지가 없습니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/ongoing")
    @ApiOperation(value = "진행 중인 랭킹 챌린지 조회", notes = "진행 중인 랭킹 챌린지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "진행 중인 랭킹 챌린지 주제 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getRankingChallengeOngoing(@ApiIgnore Authentication authentication) {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userService.getUserByUserId(userId);
        if (user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "권한이 없습니다."));
        try {
            List<ChallengePreset> challengePresetList = challengeService.getChallengePreset();
            LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
            LocalDate start = LocalDateTimeUtils.getFirstDayOfTargetMonth(now);
            LocalDate end = LocalDateTimeUtils.getLastDayOfTargetMonth(now);
            return ResponseEntity.status(200).body(ChallengePresetGetRes.of(200, "진행 중인 랭킹 챌린지 주제 조회 성공", start, end, challengePresetList));
//        } catch (InvalidUserException invalidUserException) {
//            invalidUserException.printStackTrace();
//            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @GetMapping("/scheduled")
    @ApiOperation(value = "모집 중인 랭킹 챌린지 조회", notes = "모집 중인 랭킹 챌린지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "주제별 랭킹 챌린지 순위 조회 성공"),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getRankingChallengeScheduled(@ApiIgnore Authentication authentication) {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userService.getUserByUserId(userId);
        if (user == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "권한이 없습니다."));
        try {
            List<ChallengePreset> challengePresetList = challengeService.getChallengePreset();
            LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
            LocalDate start = LocalDateTimeUtils.getFirstDayOfTargetNextMonth(now);
            LocalDate end = LocalDateTimeUtils.getLastDayOfTargetNextMonth(now);
            return ResponseEntity.status(200).body(ChallengePresetGetRes.of(200, "모집 중인 랭킹 챌린지 조회 성공", start, end, challengePresetList));
//        } catch (InvalidUserException invalidUserException) {
//            invalidUserException.printStackTrace();
//            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

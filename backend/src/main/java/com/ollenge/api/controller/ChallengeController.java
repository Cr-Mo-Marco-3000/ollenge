package com.ollenge.api.controller;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.response.ChallengePostRes;
import com.ollenge.api.response.data.ChallengeCreatedData;
import com.ollenge.api.service.ChallengeService;
import com.ollenge.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/challenge")
@AllArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

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
    public ResponseEntity<? extends BaseResponseBody> createChallenge(@Validated @RequestBody ChallengePostReq challengePostReq,
                                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            ChallengeCreatedData challengeCreatedData = challengeService.createChallenge(challengePostReq);
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
    public ResponseEntity<? extends BaseResponseBody> participateChallenge(@Validated @RequestBody ChallengeParticipationPostReq challengeParticipationPostReq,
                                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            challengeService.participateChallenge(challengeParticipationPostReq);
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
        } catch (AlreadyParticipatedException alreadyParticipatedException) {
            alreadyParticipatedException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 참여하고 있는 챌린지입니다."));
        } catch (InvalidDateTimeException invalidDateTimeException) {
            invalidDateTimeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 시작한 챌린지 입니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

//    @GetMapping
//    @ApiOperation(value = "글쓰기", notes = "댓글을 작성합니다")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "챌린지가 생성되었습니다."),
//            @ApiResponse(code = 500, message = "서버 에러 발생")
//    })
//    public ResponseEntity<? extends BaseResponseBody> getChallenge() {
//        try {
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "테스트 성공"));
//        } catch (Exception exception) {
//            exception.printStackTrace();
//            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
//        }
//    }
}

package com.ollenge.api.controller;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ChallengeParticipationPostReq;
import com.ollenge.api.request.ChallengePostReq;
import com.ollenge.api.request.ParticipationPatchReq;
import com.ollenge.api.response.*;
import com.ollenge.api.response.data.*;
import com.ollenge.api.service.ChallengeService;
import com.ollenge.api.service.ParticipationService;
import com.ollenge.api.service.UserService;
import com.ollenge.common.model.response.BaseResponseBody;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.common.util.LocalDateTimeUtils;
import com.ollenge.db.entity.ChallengePreset;
import com.ollenge.db.entity.Participation;
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
@RequestMapping("/participation")
@AllArgsConstructor
public class ParticipationController {

    private final ParticipationService participationService;

    private final UserService userService;

    @PatchMapping("/flag")
    @ApiOperation(value = "확인 플래그 변경", notes = "확인 플래그를 true로 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "확인 플래그 변경 성공"),
            @ApiResponse(code = 400, message = "해당하는 챌린지가 없습니다."),
            @ApiResponse(code = 400, message = "참여 중인 챌린지가 아닙니다."),
            @ApiResponse(code = 400, message = "끝나지 않은 챌린지 입니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> changeFlag(@ApiIgnore Authentication authentication, @RequestBody ParticipationPatchReq participationPatchReq) {
        try {
            participationService.changeFlag(authentication, participationPatchReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "확인 플래그 변경 성공"));
        } catch (InvalidChallengeIdException invalidChallengeIdException) {
            invalidChallengeIdException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 챌린지가 없습니다."));
        } catch (InvalidParticipationException invalidParticipationException) {
            invalidParticipationException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "참여 중인 챌린지가 아닙니다."));
        } catch (InvalidDateTimeException invalidDateTimeException) {
            invalidDateTimeException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "끝나지 않은 챌린지 입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

package com.ollenge.api.controller;

import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.response.FeedGetRes;
import com.ollenge.api.response.data.FeedGetData;
import com.ollenge.api.service.FeedService;
import com.ollenge.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/feed")
@AllArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/{challengeId}")
    @ApiOperation(value = "피드 목록 조회", notes = "피드 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 목록 조회 성공"),
            @ApiResponse(code = 400, message = "해당 챌린지의 회원이 아닙니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> getFeed(@ApiIgnore Authentication authentication, @PathVariable long challengeId) {
        try {
            List<FeedGetData> feedGetData = feedService.getFeedList(authentication, challengeId);
            return ResponseEntity.status(200).body(FeedGetRes.of(200, "피드 목록 조회 성공", feedGetData));
        } catch (InvalidParticipationException invalidParticipationException) {
            invalidParticipationException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당 챌린지의 회원이 아닙니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

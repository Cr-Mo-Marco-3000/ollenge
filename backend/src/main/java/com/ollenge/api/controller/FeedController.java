package com.ollenge.api.controller;

import com.ollenge.api.exception.InvalidFeedException;
import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.FeedCommentPostReq;
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
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/comment")
    @ApiOperation(value = "피드 댓글 작성", notes = "피드에 댓글을 작성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 댓글 작성 성공"),
            @ApiResponse(code = 400, message = "해당 챌린지의 회원이 아닙니다."),
            @ApiResponse(code = 400, message = "존재하지 않는 피드입니다."),
            @ApiResponse(code = 400, message = "입력형식에 맞지 않습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> createFeedComment(@ApiIgnore Authentication authentication, @Validated @RequestBody FeedCommentPostReq feedCommentPostReq,
                                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            feedService.createFeedComment(authentication, feedCommentPostReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "피드 댓글 작성 성공"));
        } catch (InvalidParticipationException invalidParticipationException) {
            invalidParticipationException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당 챌린지의 회원이 아닙니다."));
        } catch (InvalidFeedException invalidFeedException) {
            invalidFeedException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "존재하지 않는 피드입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

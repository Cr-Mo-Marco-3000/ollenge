package com.ollenge.api.controller;

import com.ollenge.api.exception.InvalidCommentException;
import com.ollenge.api.exception.InvalidFeedException;
import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.CommentPatchReq;
import com.ollenge.api.request.CommentPostReq;
import com.ollenge.api.service.CommentService;
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

@RestController
@RequestMapping("/comment")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    @ApiOperation(value = "피드 댓글 작성", notes = "피드에 댓글을 작성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 댓글 작성 성공"),
            @ApiResponse(code = 400, message = "해당 챌린지의 회원이 아닙니다."),
            @ApiResponse(code = 400, message = "존재하지 않는 피드입니다."),
            @ApiResponse(code = 400, message = "입력형식에 맞지 않습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> createComment(@ApiIgnore Authentication authentication, @Validated @RequestBody CommentPostReq feedCommentPostReq,
                                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            commentService.createComment(authentication, feedCommentPostReq);
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

    @PatchMapping
    @ApiOperation(value = "피드 댓글 수정", notes = "피드 댓글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 댓글 수정 성공"),
            @ApiResponse(code = 400, message = "존재하지 않는 댓글입니다."),
            @ApiResponse(code = 400, message = "입력형식에 맞지 않습니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> updateComment(@ApiIgnore Authentication authentication, @Validated @RequestBody CommentPatchReq commentPatchReq,
                                                                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 형식에 맞지 않습니다."));
        }

        try {
            commentService.updateComment(authentication, commentPatchReq);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "피드 댓글 수정 성공"));
        } catch (InvalidCommentException invalidCommentException) {
            invalidCommentException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "존재하지 않는 댓글입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }

    @DeleteMapping("/{commentId}")
    @ApiOperation(value = "피드 댓글 삭제", notes = "피드 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 댓글 삭제 성공"),
            @ApiResponse(code = 400, message = "존재하지 않는 댓글입니다."),
            @ApiResponse(code = 400, message = "권한이 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<? extends BaseResponseBody> updateComment(@ApiIgnore Authentication authentication, @PathVariable long commentId) {
        try {
            commentService.deleteComment(authentication, commentId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "피드 댓글 삭제 성공"));
        } catch (InvalidCommentException invalidCommentException) {
            invalidCommentException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "존재하지 않는 댓글입니다."));
        } catch (InvalidUserException invalidUserException) {
            invalidUserException.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(400, "권한이 없습니다."));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 에러 발생"));
        }
    }
}

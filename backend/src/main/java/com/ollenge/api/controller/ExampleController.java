package com.ollenge.api.controller;

import com.ollenge.api.service.ExampleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/example")
@AllArgsConstructor
public class ExampleController {

    private final ExampleService exampleService;

    /*

    @PostMapping
    @ApiOperation(value = "글쓰기", notes = "댓글을 작성합니다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "글이 등록되었습니다"),
            @ApiResponse(code = 400, message = "입력 내용을 다시 확인해주세요"),
            @ApiResponse(code = 500, message = "오류가 발생했습니다")
    })
    public ResponseEntity<? extends BaseResponseBody> postBoard(@Validated @RequestBody BoardPostReq boardPostReq,
                                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 내용을 다시 확인해주세요"));
        }

        try {
            Example example = exampleService.example(examplePostReq);
            return ResponseEntity.status(200).body(ExampleGetResponse.of(200, "글이 등록되었습니다", example));
        } catch (NoSuchElementException noSuchElementException) {
            noSuchElementException.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "입력 내용을 다시 확인해주세요"));
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "오류가 발생했습니다"));
        }
    }
    */

}

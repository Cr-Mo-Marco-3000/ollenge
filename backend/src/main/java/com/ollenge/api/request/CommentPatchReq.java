package com.ollenge.api.request;

import com.ollenge.common.util.StringUtils;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CommentPatchReq {

    @ApiParam(value = "댓글 ID")
    @Positive
    Long commentId;

    @ApiParam(value = "댓글 내용")
    @NotBlank
    @Size(min = 1, max = 300)
    @Pattern(regexp= StringUtils.contentRegex)
    String commentContent;
}

package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ReportUserReq {

    @ApiParam(value = "신고할 유저 ID")
    @Positive
    Long reportedUserId;

    @ApiParam(value = "신고 사유")
    @NotBlank
    @Size(min = 1, max = 100)
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    String reportContent;
}

package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class BadgePatchReq {

    @ApiParam(value = "뱃지 ID")
    @Positive
    Long badgeId;

}

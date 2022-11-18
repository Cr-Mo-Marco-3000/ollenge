package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class ParticipationPatchReq {

    @ApiParam(value = "챌린지 ID")
    @Positive
    Long challengeId;

}

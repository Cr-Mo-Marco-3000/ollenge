package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ChallengeParticipationPostReq {
    @ApiParam(value = "유저 ID", required = true)
    @NotBlank
    private long userId;

    @ApiParam(value = "챌린지 ID", required = true)
    @NotBlank
    private long challengeId;

    @ApiParam(value = "인증 코드", required = true)
    @NotBlank
    private String inviteCode;

}

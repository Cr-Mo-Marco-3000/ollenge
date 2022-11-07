package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ChallengePostReq {
    @ApiParam(value = "챌린지 프리셋 ID")
    @Positive
    private Long challengePresetId;

    @ApiParam(value = "챌린지 사진 링크")
    @Size(max = 255)
    private String challengeImg;

    @ApiParam(value = "챌린지 이름", required = true)
    @NotBlank
    @Size(min = 1, max = 50)
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    private String challengeName;

    @ApiParam(value = "챌린지 주제", required = true)
    @NotBlank
    @Size(min = 1, max = 50)
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    private String challengeTopic;

    @ApiParam(value = "인증 방식", required = true)
    @NotBlank
    @Size(max = 10)
    private String authType;

    @ApiParam(value = "챌린지 시작일", required = true)
    @NotNull
    private LocalDate startDate;

    @ApiParam(value = "챌린지 종료일", required = true)
    @NotNull
    private LocalDate endDate;

    @ApiParam(value = "챌린지 인증 시작 시간", required = true)
    @NotNull
    private LocalTime startTime;

    @ApiParam(value = "챌린지 인증 종료 시간", required = true)
    @NotNull
    private LocalTime endTime;

    @ApiParam(value = "챌린지 보상")
    @Size(max = 100)
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    private String rewardContent;

    @ApiParam(value = "챌린지 벌칙")
    @Size(max = 100)
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    private String penaltyContent;

    @ApiParam(value = "챌린지 설명")
    @Pattern(regexp="^[가-힣a-zA-Z0-9 ]*$")
    @Size(max = 300)
    private String challengeDescription;

    @ApiParam(value = "목표 걸음 수")
    private Integer stepCount;

    @ApiParam(value = "챌린지 이미지 분류 타입 ID")
    private Long classificationTypeID;
}

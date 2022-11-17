package com.ollenge.api.request;

import com.ollenge.common.util.StringUtils;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserPostReq {

    @ApiParam(value = "프로필 사진")
    String profileImg;

    @ApiParam(value = "닉네임")
    @Size(min = 2, max = 14)
    @Pattern(regexp= StringUtils.nicknameRegex)
    String nickname;

    @ApiParam(value = "유저 설명")
    @Size(max = 100)
    String userDescription;

}

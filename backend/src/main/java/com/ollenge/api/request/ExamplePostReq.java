package com.ollenge.api.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ExamplePostReq {
    @ApiParam(value = "설명", required = true)
    @NotBlank
    @Size(max = 20)
    private String field1;

    @ApiParam(value = "설명", required = true)
    @Size(max = 50)
    private String field2;

    @ApiParam(value = "설명", required = true)
    @Size(max = 50)
    private String field3;

    @ApiParam(value = "설명", required = true)
    @Size(max = 500)
    private String field4;

}

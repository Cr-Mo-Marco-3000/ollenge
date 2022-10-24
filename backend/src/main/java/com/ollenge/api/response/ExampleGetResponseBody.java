package com.ollenge.api.response;

import com.ollenge.api.response.data.ExampleData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExampleGetResponseBody extends BaseResponseBody {

    List<ExampleData> boardData;

    public static ExampleGetResponseBody of(int status, String msg, List<ExampleData> boardData) {
        ExampleGetResponseBody boardGetRes = new ExampleGetResponseBody();
        boardGetRes.setStatusCode(status);
        boardGetRes.setMessage(msg);
        boardGetRes.boardData = boardData;

        return boardGetRes;
    }
}

package com.ollenge.api.response;

import com.ollenge.api.response.data.FeedGetData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FeedGetRes extends BaseResponseBody {

    List<FeedGetData> feedList;

    public static FeedGetRes of(Integer statusCode, String message, List<FeedGetData> feedList) {
        FeedGetRes response = new FeedGetRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setFeedList(feedList);
        return response;
    }
}

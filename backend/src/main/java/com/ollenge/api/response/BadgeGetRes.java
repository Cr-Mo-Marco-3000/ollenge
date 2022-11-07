package com.ollenge.api.response;

import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BadgeGetRes extends BaseResponseBody {

    List<BadgeGetData> badgeList;

    public static BadgeGetRes of(Integer statusCode, String message, List<BadgeGetData> badgeList) {
        BadgeGetRes response = new BadgeGetRes();
        response.setMessage(message);
        response.setStatusCode(statusCode);
        response.setBadgeList(badgeList);
        return response;
    }
}

package com.ollenge.api.response.data;

import com.ollenge.db.entity.Feed;
import com.ollenge.db.entity.User;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class FeedGetData {

    long feedId;
    String feedType;
    String profileImg;
    long userId;
    String nickname;
    String feedImg;
    String feedContent;
    LocalDateTime createdDatetime;
    Integer commentNum;

    public static FeedGetData of(User user, Feed feed, Integer commentNum) {
        FeedGetData feedGetData = new FeedGetData();
        feedGetData.feedId = feed.getFeedId();
        feedGetData.feedType = feed.getFeedType();
        feedGetData.profileImg = user.getProfileImg();
        feedGetData.userId = user.getUserId();
        feedGetData.nickname = user.getNickname();
        feedGetData.feedImg = feed.getFeedImg();
        feedGetData.feedContent = feed.getFeedContent();
        feedGetData.createdDatetime = feed.getCreatedDatetime();
        feedGetData.commentNum = commentNum;
        return feedGetData;
    }
}

package com.ollenge.api.response.data;

import com.ollenge.db.entity.Comment;
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
public class CommentGetData {
    long commentId;
    String profileImg;
    long userId;
    String nickname;
    String commentContent;
    LocalDateTime createdDatetime;
    LocalDateTime modifiedDatetime;

    public static CommentGetData of(Comment comment) {
        CommentGetData commentGetData = new CommentGetData();
        commentGetData.commentId = comment.getCommentId();
        commentGetData.profileImg = comment.getUser().getProfileImg();
        commentGetData.userId = comment.getUser().getUserId();
        commentGetData.nickname = comment.getUser().getNickname();
        commentGetData.commentContent = comment.getCommentContent();
        commentGetData.createdDatetime = comment.getCreatedDatetime();
        commentGetData.modifiedDatetime = comment.getModifiedDatetime();
        return commentGetData;
    }
}

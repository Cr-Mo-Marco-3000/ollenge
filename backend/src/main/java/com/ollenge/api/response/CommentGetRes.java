package com.ollenge.api.response;

import com.ollenge.api.response.data.CommentGetData;
import com.ollenge.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentGetRes extends BaseResponseBody {

    List<CommentGetData> commentList;

    public static CommentGetRes of(int status, String msg, List<CommentGetData> commentList) {
        CommentGetRes commentGetRes = new CommentGetRes();
        commentGetRes.setStatusCode(status);
        commentGetRes.setMessage(msg);
        commentGetRes.commentList = commentList;

        return commentGetRes;
    }
}

package com.ollenge.api.response.data;

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
public class ExampleData {

    long boardId;
    String userName;
    String boardContent;
    LocalDateTime createdDate;
    LocalDateTime updatedDate;

    public static ExampleData of(long boardId,
                                 String userName,
                                 String boardContent,
                                 LocalDateTime createdDate,
                                 LocalDateTime updatedDate) {
        ExampleData boardData = new ExampleData();
        boardData.boardId = boardId;
        boardData.userName = userName;
        boardData.boardContent = boardContent;
        boardData.createdDate = createdDate;
        boardData.updatedDate = updatedDate;

        return boardData;
    }
}

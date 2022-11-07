package com.ollenge.api.response.data;

import com.ollenge.db.entity.User;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Getter
@Setter
public class TotalUserRankData {

    long userId;
    String nickname;
    String profileImg;
    int userScore;
    int rank;


    public static TotalUserRankData of(User user, int i) {
        TotalUserRankData totalUserRankData = new TotalUserRankData();
        totalUserRankData.userId = user.getUserId();
        totalUserRankData.nickname = user.getNickname();
        totalUserRankData.profileImg = user.getProfileImg();
        totalUserRankData.userScore = user.getUserScore();
        totalUserRankData.rank = i;

        return totalUserRankData;
    }
}
package com.ollenge.api.response.data;

import com.ollenge.db.entity.Badge;
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
public class BadgeGetData {

    long badgeId;
    String type;
    int grade;
    LocalDateTime createdDatetime;
    boolean badgeFlag;

    public static BadgeGetData of(Badge badge) {
        BadgeGetData badgeGetRes = new BadgeGetData();
        badgeGetRes.badgeId = badge.getBadgeId();
        badgeGetRes.type = badge.getType();
        badgeGetRes.grade = badge.getGrade();
        badgeGetRes.createdDatetime = badge.getCreatedDatetime();
        badgeGetRes.badgeFlag = badge.isBadgeFlag();
        return badgeGetRes;
    }
}

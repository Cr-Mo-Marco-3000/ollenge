package com.ollenge.api.service;

import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.db.entity.Badge;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.BadgeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;

    public List<BadgeGetData> getBadgeList(User user) {
        List<Badge> badgeList = badgeRepository.findByUser(user);
        List<BadgeGetData> badgeGetDataList = new ArrayList<>();
        for (Badge badge : badgeList) {
            badgeGetDataList.add(new BadgeGetData(badge.getBadgeId(), badge.getType(), badge.getGrade(), badge.getCreatedDatetime(), badge.isBadgeFlag()));
        }
        return badgeGetDataList;
    }
}

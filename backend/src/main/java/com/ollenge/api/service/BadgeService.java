package com.ollenge.api.service;

import com.ollenge.api.exception.InvalidReqUserException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.Badge;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.BadgeRepository;
import com.ollenge.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class BadgeService {

    private final UserRepository userRepository;

    private final BadgeRepository badgeRepository;

    public List<BadgeGetData> getBadgeList(Authentication authentication, long reqUserId) throws InvalidUserException, InvalidReqUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        User reqUser = userRepository.findById(reqUserId)
                .orElseThrow(() -> { return new InvalidReqUserException("Invalid ID " + reqUserId); });
        List<Badge> badgeList = badgeRepository.findByUser(reqUser);
        List<BadgeGetData> badgeGetDataList = new ArrayList<>();
        for (Badge badge : badgeList) {
            badgeGetDataList.add(new BadgeGetData(badge.getBadgeId(), badge.getType(), badge.getGrade(), badge.getCreatedDatetime(), badge.isBadgeFlag()));
        }
        return badgeGetDataList;
    }
}

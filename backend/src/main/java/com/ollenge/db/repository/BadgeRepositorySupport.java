package com.ollenge.db.repository;

import com.ollenge.db.entity.Badge;
import com.ollenge.db.entity.QBadge;
import com.ollenge.db.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BadgeRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QBadge qBadge = QBadge.badge;

    public List<Badge> getUserBadgeList(List<User> user) {
        return jpaQueryFactory.select(qBadge)
                .from(qBadge)
                .where(qBadge.user.in(user))
                .fetch();
    }
}

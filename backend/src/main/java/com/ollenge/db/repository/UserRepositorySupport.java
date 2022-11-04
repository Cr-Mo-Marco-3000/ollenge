package com.ollenge.db.repository;

import com.ollenge.db.entity.*;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateTemplate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QParticipation qParticipation = QParticipation.participation;

    QFeed qFeed = QFeed.feed;


    public List<Challenge> getUserOngoingUserChallenge (User user, boolean isRankingChallenge) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedToday = today.format(formatter);
        DateTemplate formattedStartDate = Expressions.dateTemplate(
                LocalDate.class
                ,"DATE_FORMAT({0}, {1})"
                , qParticipation.challenge.startDate
                , ConstantImpl.create("%Y-%m-%d"));
        DateTemplate formattedEndDate = Expressions.dateTemplate(
                LocalDate.class
                ,"DATE_FORMAT({0}, {1})"
                , qParticipation.challenge.endDate
                , ConstantImpl.create("%Y-%m-%d"));
        /*
            select c.*, p.*, (CASE WHEN f.participation_id IS NOT NULL THEN true ELSE false END) as todayAuthStat from participation p
            left outer join (select participation_id from feed where DATE_FORMAT(created_datetime, '%Y-%m-%d')="2022-11-03") f on p.participation_id=f.participation_id
            inner join challenge c on p.challenge_id=c.challenge_id
            where p.user_id=1 and c.start_date<="2022-11-03" and c.end_date>="2022-11-03" and c.challenge_preset_id is null;
        */
        return jpaQueryFactory
                .select(qParticipation.challenge)
                .from(qParticipation)
                .where(qParticipation.user.eq(user)
                        .and(formattedStartDate.loe(formatedToday))
                        .and(formattedEndDate.goe(formatedToday))
                        .and(challengPreseteNotNull(isRankingChallenge)))
                .fetch();
    }

    private BooleanExpression challengPreseteNotNull(boolean isRankingChallenge) {
        if (isRankingChallenge) return qParticipation.challenge.challengePreset.isNotNull();
        return qParticipation.challenge.challengePreset.isNull();
    }
}

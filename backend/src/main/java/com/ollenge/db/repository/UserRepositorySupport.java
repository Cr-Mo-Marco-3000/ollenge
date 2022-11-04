package com.ollenge.db.repository;

import com.ollenge.api.response.data.UserParticipatedChallengeData;
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
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QParticipation qParticipation = QParticipation.participation;

    QFeed qFeed = QFeed.feed;

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

    public List<UserParticipatedChallengeData> getUserChallenge(User user, String type, boolean isRankingChallenge) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedToday = today.format(formatter);

        List<Challenge> challengeList = jpaQueryFactory
                .select(qParticipation.challenge)
                .from(qParticipation)
                .where(qParticipation.user.eq(user), challengeDate(type, formatedToday) ,challengPreseteNotNull(isRankingChallenge))
                .fetch();

        List<UserParticipatedChallengeData> participatedChallengeList = new ArrayList<>();
        for (Challenge item : challengeList) {
            participatedChallengeList.add(UserParticipatedChallengeData.of(item));
        }
        return participatedChallengeList;
    }

    private BooleanExpression challengeDate(String type, String formatedToday) {
        if (type.equals("scheduled")) return formattedStartDate.gt(formatedToday);
        else if (type.equals("ongoing")) return formattedStartDate.loe(formatedToday).and(formattedEndDate.goe(formatedToday));
        else if (type.equals("completed")) return formattedEndDate.lt(formatedToday);
        return null;
    }

    private BooleanExpression challengPreseteNotNull(boolean isRankingChallenge) {
        if (isRankingChallenge) return qParticipation.challenge.challengePreset.isNotNull();
        return qParticipation.challenge.challengePreset.isNull();
    }

    /*
            select c.*, p.*, (CASE WHEN f.participation_id IS NOT NULL THEN true ELSE false END) as todayAuthStat from participation p
            left outer join (select participation_id from feed where DATE_FORMAT(created_datetime, '%Y-%m-%d')="2022-11-03") f on p.participation_id=f.participation_id
            inner join challenge c on p.challenge_id=c.challenge_id
            where p.user_id=1 and c.start_date<="2022-11-03" and c.end_date>="2022-11-03" and c.challenge_preset_id is null;
        */
}

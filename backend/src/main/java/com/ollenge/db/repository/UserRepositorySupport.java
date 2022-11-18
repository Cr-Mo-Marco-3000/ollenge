package com.ollenge.db.repository;

import com.ollenge.api.response.data.TotalUserRankData;
import com.ollenge.api.response.data.UserCompletedChallengeData;
import com.ollenge.api.response.data.UserOngoingChallengeData;
import com.ollenge.api.response.data.UserScheduledChallengeData;
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
import java.util.HashSet;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QParticipation qParticipation = QParticipation.participation;

    QFeed qFeed = QFeed.feed;

    QUser qUser = QUser.user;

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

    DateTemplate formattedCreatedDateTime = Expressions.dateTemplate(
            LocalDate.class
            ,"DATE_FORMAT({0}, {1})"
            , qFeed.createdDatetime
            , ConstantImpl.create("%Y-%m-%d"));

    public List<UserOngoingChallengeData> getUserOngoingChallenge(User user, boolean isRankingChallenge) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedToday = today.format(formatter);

        List<Challenge> challengeList = jpaQueryFactory
                .select(qParticipation.challenge)
                .from(qParticipation)
                .where(qParticipation.user.eq(user), formattedStartDate.loe(formatedToday).and(formattedEndDate.goe(formatedToday)) ,challengPreseteNotNull(isRankingChallenge))
                .fetch();

        List<Long> authChallengeIdList = jpaQueryFactory
                .select(qParticipation.challenge.challengeId)
                .from(qParticipation)
                .join(qParticipation.feed, qFeed)
                .where(qParticipation.user.eq(user), formattedStartDate.loe(formatedToday).and(formattedEndDate.goe(formatedToday)), formattedCreatedDateTime.eq(formatedToday),challengPreseteNotNull(isRankingChallenge))
                .fetch();
        HashSet<Long> authChallengeIdSet = new HashSet<>(authChallengeIdList);

        List<UserOngoingChallengeData> participatedChallengeList = new ArrayList<>();
        for (Challenge item : challengeList) {
            participatedChallengeList.add(UserOngoingChallengeData.of(item, authChallengeIdSet.contains(item.getChallengeId())));
        }
        return participatedChallengeList;
    }

    public List<UserCompletedChallengeData> getUserCompletedChallenge(User user, boolean isRankingChallenge) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedToday = today.format(formatter);

        List<Participation> participationList = jpaQueryFactory
                .select(qParticipation)
                .from(qParticipation)
                .where(qParticipation.user.eq(user), formattedEndDate.lt(formatedToday) ,challengPreseteNotNull(isRankingChallenge))
                .fetch();
        List<UserCompletedChallengeData> participatedChallengeList = new ArrayList<>();
        for (Participation participation : participationList) {
            Challenge challenge = participation.getChallenge();
            ChallengeResult challengeResult = participation.getChallenge().getChallengeResult();
            participatedChallengeList.add(UserCompletedChallengeData.of(challenge, participation, challengeResult));
        }
        return participatedChallengeList;
    }

    public List<UserScheduledChallengeData> getUserScheduledChallenge(User user, boolean isRankingChallenge) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedToday = today.format(formatter);

        List<Challenge> challengeList = jpaQueryFactory
                .select(qParticipation.challenge)
                .from(qParticipation)
                .where(qParticipation.user.eq(user), formattedStartDate.gt(formatedToday) ,challengPreseteNotNull(isRankingChallenge))
                .fetch();

        List<UserScheduledChallengeData> scheduledChallengeDataList = new ArrayList<>();
        for (Challenge item : challengeList) {
            scheduledChallengeDataList.add(UserScheduledChallengeData.of(item));
        }
        return scheduledChallengeDataList;
    }

    private BooleanExpression challengPreseteNotNull(boolean isRankingChallenge) {
        if (isRankingChallenge) return qParticipation.challenge.challengePreset.isNotNull();
        return qParticipation.challenge.challengePreset.isNull();
    }

    public List<TotalUserRankData> getTotalUserRank(){
        List<User> userList = jpaQueryFactory
                .selectFrom(qUser)
                .orderBy(qUser.userScore.desc())
                .limit(100)
                .fetch();
        List<TotalUserRankData> totalUserRankDataList = new ArrayList<>();

//        userList.stream()
//                .forEach(item -> {
//                    totalUserRankDataList.add(TotalUserRankData.of(item));
//                });
        int i = 1;
        for(User item: userList) {
            totalUserRankDataList.add(TotalUserRankData.of(item, i++));
        }

        return totalUserRankDataList;
    }


    public TotalUserRankData getUserRank(User userIdentification){
        long userId = userIdentification.getUserId();
        int score = userIdentification.getUserScore();
        List<User> user = jpaQueryFactory
                .selectFrom(qUser)
                .where(qUser.userId.eq(userId))
                .fetch();
        long rank = jpaQueryFactory
                .select(qUser.count())
                .from(qUser)
                .where(qUser.userScore.gt(score))
                .fetchFirst();

        int intRank = (int)rank+1;
        TotalUserRankData userRankData = null;
        for(User item: user) {
            userRankData = TotalUserRankData.of(item, intRank);
        }

        return userRankData;
    }
}

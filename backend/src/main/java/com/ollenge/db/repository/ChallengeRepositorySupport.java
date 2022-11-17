package com.ollenge.db.repository;

import com.ollenge.api.response.data.ChallengeStateData;
import com.ollenge.db.entity.*;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChallengeRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QParticipation qParticipation = QParticipation.participation;

    QFeed qFeed = QFeed.feed;

    public List<Challenge> getRankingChallengeTopicPeriod (User user, LocalDate startDate, LocalDate endDate, ChallengePreset challengePreset) {
        return jpaQueryFactory
                .select(qParticipation.challenge)
                .from(qParticipation)
                .where(userEq(user),
                        qParticipation.challenge.startDate.eq(startDate)
                        .and(qParticipation.challenge.endDate.eq(endDate))
                        .and(qParticipation.challenge.challengePreset.eq(challengePreset)))
                .orderBy(qParticipation.challenge.challengeScore.desc())
                .fetch();
    }

    public List<Challenge> getRankingChallengeListTopicPeriod (LocalDate startDate, LocalDate endDate, ChallengePreset challengePreset) {
        StringPath aliasAchievement = Expressions.stringPath("achievement");
        List<Tuple> challengeTuple = jpaQueryFactory
                .select(qChallenge, qChallenge.challengeScore.castToNum(BigDecimal.class).divide(qChallenge.peopleCnt.castToNum(BigDecimal.class)).as("achievement"))
                .from(qChallenge)
                .where(qChallenge.startDate.eq(startDate)
                        .and(qChallenge.endDate.eq(endDate))
                        .and(qChallenge.challengePreset.eq(challengePreset)))
                .orderBy(aliasAchievement.desc())
                .fetch();
        List<Challenge> challengeList = new ArrayList<>();
        challengeTuple.stream()
                .forEach(tuple -> challengeList.add(tuple.get(qChallenge)));
        return challengeList;
    }

    private BooleanExpression userEq(User user) {
        return (user != null) ? qParticipation.user.eq(user) : null;
    }

    public List<ChallengeStateData> getChallengeState(Challenge challenge) {
        List<Tuple> result = jpaQueryFactory.select(qParticipation.user, qFeed.createdDatetime)
                .from(qFeed)
                .rightJoin(qFeed.participation, qParticipation)
                .where(qParticipation.challenge.eq(challenge), qFeed.feedType.eq("user"))
                .fetch();

        List<ChallengeStateData> challengeStateDataList = new ArrayList<>();
        HashMap<User, List<LocalDateTime>> challengeStateMap = new HashMap<>();
        result.stream()
                .forEach(tuple -> {
                    User user = tuple.get(qParticipation.user);
                    LocalDateTime datetime = tuple.get(qFeed.createdDatetime);
                    List<LocalDateTime> list = challengeStateMap.getOrDefault(user, new ArrayList<>());
                    if (datetime != null) {
                        list.add(datetime);
                    }
                    challengeStateMap.put(user, list);
                });
        for (User user : challengeStateMap.keySet()) {
            challengeStateDataList.add(ChallengeStateData.of(user, challengeStateMap.get(user)));
        }
        Collections.sort(challengeStateDataList, (user1, user2) -> {
            if(user1.getDatetimeList().size() == user2.getDatetimeList().size())
                return user1.getNickname().compareTo(user2.getNickname());
            return user2.getDatetimeList().size() - user1.getDatetimeList().size();
        });
        return challengeStateDataList;
    }

    public List<Long> getParticipatedChallengePresetId(User user, LocalDate startDate, LocalDate endDate) {
        return jpaQueryFactory.select(qParticipation.challenge.challengePreset.challengePresetId)
                .from(qParticipation)
                .where(qParticipation.user.eq(user)
                        .and(qParticipation.challenge.startDate.eq(startDate))
                        .and(qParticipation.challenge.endDate.eq(endDate))
                        .and(qParticipation.challenge.challengePreset.isNotNull()))
                .fetch();
    }
}

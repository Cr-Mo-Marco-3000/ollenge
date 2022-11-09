package com.ollenge.db.repository;

import com.ollenge.api.response.data.ChallengeStateData;
import com.ollenge.db.entity.*;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
        return jpaQueryFactory
                .select(qChallenge)
                .from(qChallenge)
                .where(qChallenge.startDate.eq(startDate)
                        .and(qChallenge.endDate.eq(endDate))
                        .and(qChallenge.challengePreset.eq(challengePreset)))
                .orderBy(qChallenge.challengeScore.desc())
                .fetch();
    }

    private BooleanExpression userEq(User user) {
        return (user != null) ? qParticipation.user.eq(user) : null;
    }

    public List<ChallengeStateData> getChallengeState(Challenge challenge) {
        List<Tuple> result = jpaQueryFactory.select(qParticipation.user, qFeed.createdDatetime)
                .from(qFeed)
                .rightJoin(qFeed.participation, qParticipation)
                .where(qParticipation.challenge.eq(challenge))
                .fetch();

        List<ChallengeStateData> challengeStateDataList = new ArrayList<>();
        HashMap<User, List<LocalDateTime>> challengeStateMap = new HashMap<>();
        result.stream()
                .forEach(tuple -> {
                    User user = tuple.get(qParticipation.user);
                    LocalDateTime datetime = tuple.get(qFeed.createdDatetime);
                    List<LocalDateTime> list = challengeStateMap.getOrDefault(user, new ArrayList<>());
                    list.add(datetime);
                    challengeStateMap.put(user, list);
                });
        for (User user : challengeStateMap.keySet()) {
            challengeStateDataList.add(ChallengeStateData.of(user.getUserId(), user.getNickname(), user.getProfileImg(), challengeStateMap.get(user)));
        }
        Collections.sort(challengeStateDataList, (user1, user2) -> {
            if(user1.getDatetimeList().size() == user2.getDatetimeList().size())
                return user1.getNickname().compareTo(user2.getNickname());
            return user2.getDatetimeList().size() - user1.getDatetimeList().size();
        });
        return challengeStateDataList;
    }

}

package com.ollenge.db.repository;

import com.ollenge.db.entity.*;
import com.ollenge.api.response.data.ChallengeStateData;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
                .where(qParticipation.user.eq(user)
                        .and(qParticipation.challenge.startDate.eq(startDate))
                        .and(qParticipation.challenge.endDate.eq(endDate))
                        .and(qParticipation.challenge.challengePreset.eq(challengePreset)))
                .fetch();
    }

    public List<ChallengeStateData> getChallengeState(Challenge challenge) {
        List<Tuple> result = jpaQueryFactory.select(qFeed.participation.user, qFeed.createdDatetime)
                .from(qFeed)
                .where(qFeed.participation.challenge.eq(challenge))
                .fetch();

        List<ChallengeStateData> challengeStateDataList = new ArrayList<>();
        HashMap<User, List<LocalDateTime>> challengeStateMap = new HashMap<>();
        result.stream()
                .forEach(tuple -> {
                    User user = tuple.get(qFeed.participation.user);
                    LocalDateTime datetime = tuple.get(qFeed.createdDatetime);
                    List<LocalDateTime> list = challengeStateMap.getOrDefault(user, new ArrayList<>());
                    list.add(datetime);
                    challengeStateMap.put(user, list);
                });
        for (User user : challengeStateMap.keySet()) {
            challengeStateDataList.add(ChallengeStateData.of(user.getUserId(), user.getNickname(), user.getProfileImg(), challengeStateMap.get(user)));
        }
        return challengeStateDataList;
    }
}

package com.ollenge.db.repository;

import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.QChallenge;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChallengeRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;

    public List<Challenge> getRankingChallengeTopicPeriod (LocalDate startDate, LocalDate endDate, String challengeTopic) {
        List<Challenge> rankingChallengeTopicPeriod = jpaQueryFactory
                .select(qChallenge)
                .from(qChallenge)
                .where(qChallenge.challengePreset.isNotNull()
                        .and(qChallenge.startDate.eq(startDate))
                        .and(qChallenge.endDate.eq(endDate))
                        .and(qChallenge.challengeTopic.eq(challengeTopic)))
                .fetch();
        return rankingChallengeTopicPeriod;
    }
}

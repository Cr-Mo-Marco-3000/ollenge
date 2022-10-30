package com.ollenge.db.repository;

import com.ollenge.db.entity.QAuthClassification;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AuthClassificationRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QAuthClassification qAuthClassification = QAuthClassification.authClassification;

//    public List<Challenge> getRankingChallengeTopicPeriod (LocalDate startDate, LocalDate endDate, String challengeTopic) {
//        List<Challenge> rankingChallengeTopicPeriod = jpaQueryFactory
//                .select(qAuthClassification)
//                .from(qAuthClassification)
//                .fetch();
//        return rankingChallengeTopicPeriod;
//    }
}

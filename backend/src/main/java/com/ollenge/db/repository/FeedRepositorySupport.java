package com.ollenge.db.repository;

import com.ollenge.api.response.data.FeedGetData;
import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.Feed;
import com.ollenge.db.entity.QFeed;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FeedRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    QFeed qFeed = QFeed.feed;

    public List<FeedGetData> getFeedList(Challenge challenge) {
        List<Feed> result = jpaQueryFactory.select(qFeed)
                .from(qFeed)
                .where(qFeed.participation.challenge.eq(challenge))
                .orderBy(qFeed.feedId.desc())
                .fetch();
        List<FeedGetData> feedGetDataList = new ArrayList<>();
        for (Feed feed : result) {
            feedGetDataList.add(FeedGetData.of(feed.getParticipation().getUser(), feed, null));
        }
        return feedGetDataList;
    }
}

package com.ollenge.api.service;

import com.ollenge.api.exception.InvalidChallengeIdException;
import com.ollenge.api.exception.InvalidFeedException;
import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.FeedCommentPostReq;
import com.ollenge.api.response.data.FeedGetData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.Comment;
import com.ollenge.db.entity.Feed;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;


@Service
@AllArgsConstructor
public class FeedService {

    private final UserRepository userRepository;
    private final ParticipationRepository participationRepository;
    private final FeedRepository feedRepository;
    private final FeedRepositorySupport feedRepositorySupport;
    private final CommentRepository commentRepository;

    public List<FeedGetData> getFeedList(Authentication authentication, long challengeId) throws InvalidChallengeIdException, InvalidUserException, InvalidParticipationException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Challenge challenge = Challenge.ChallengeBuilder().challengeId(challengeId).build();
        if(participationRepository.findByChallengeAndUser(challenge, user).isEmpty()) {
            throw new InvalidParticipationException("Not a challenge's member");
        }
        return feedRepositorySupport.getFeedList(challenge);
    }

    public void createFeedComment(Authentication authentication, FeedCommentPostReq feedCommentPostReq) throws InvalidChallengeIdException, InvalidUserException, InvalidParticipationException, InvalidFeedException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Feed feed = feedRepository.findById(feedCommentPostReq.getFeedId())
                .orElseThrow(() -> { return new InvalidFeedException("Invalid Feed ID " + feedCommentPostReq.getFeedId()); });
        if(participationRepository.findByChallengeAndUser(feed.getParticipation().getChallenge(), user).isEmpty()) {
            throw new InvalidParticipationException("Not a challenge's member");
        }
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        Comment comment = Comment.builder().feed(feed).user(user).commentContent(feedCommentPostReq.getCommentContent()).createdDatetime(now).build();
        commentRepository.save(comment);
    }


}

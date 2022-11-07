package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.CommentPatchReq;
import com.ollenge.api.request.CommentPostReq;
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

    public void createComment(Authentication authentication, CommentPostReq commentPostReq) throws InvalidChallengeIdException, InvalidUserException, InvalidParticipationException, InvalidFeedException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Feed feed = feedRepository.findById(commentPostReq.getFeedId())
                .orElseThrow(() -> { return new InvalidFeedException("Invalid Feed ID " + commentPostReq.getFeedId()); });
        if(participationRepository.findByChallengeAndUser(feed.getParticipation().getChallenge(), user).isEmpty()) {
            throw new InvalidParticipationException("Not a challenge's member");
        }
        Comment comment = Comment.builder().feed(feed).user(user).commentContent(commentPostReq.getCommentContent()).build();
        commentRepository.save(comment);
    }


    public void updateComment(Authentication authentication, CommentPatchReq commentPatchReq) throws InvalidUserException, InvalidCommentException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Comment comment = commentRepository.findById(commentPatchReq.getCommentId())
                .orElseThrow(() -> { return new InvalidCommentException("Invalid Comment ID " + commentPatchReq.getCommentId()); });
        if(comment.getUser().equals(user)) {
            throw new InvalidUserException("Only comment's owner can edit comment");
        }
        comment.setCommentContent(commentPatchReq.getCommentContent());
        commentRepository.save(comment);
    }
}

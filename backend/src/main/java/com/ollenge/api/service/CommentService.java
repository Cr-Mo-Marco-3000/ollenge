package com.ollenge.api.service;

import com.ollenge.api.exception.InvalidCommentException;
import com.ollenge.api.exception.InvalidFeedException;
import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.request.CommentPatchReq;
import com.ollenge.api.request.CommentPostReq;
import com.ollenge.api.response.data.CommentGetData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.Comment;
import com.ollenge.db.entity.Feed;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.CommentRepository;
import com.ollenge.db.repository.FeedRepository;
import com.ollenge.db.repository.ParticipationRepository;
import com.ollenge.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final ParticipationRepository participationRepository;
    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;

    public List<CommentGetData> getComment(Authentication authentication, long feedId) throws InvalidUserException, InvalidFeedException, InvalidParticipationException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> { return new InvalidFeedException("Invalid Feed ID " + feedId); });
        if(participationRepository.findByChallengeAndUser(feed.getParticipation().getChallenge(), user).isEmpty()) {
            throw new InvalidParticipationException("Not a challenge's member");
        }
        List<Comment> comments = feed.getComment();
        List<CommentGetData> commentGetDataList = new ArrayList<>();
        for(Comment item : comments)
            commentGetDataList.add(CommentGetData.of(item));
        return commentGetDataList;
    }

    public void createComment(Authentication authentication, CommentPostReq commentPostReq) throws InvalidUserException, InvalidParticipationException, InvalidFeedException {
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
        if(!comment.getUser().equals(user)) {
            throw new InvalidUserException("Only comment's owner can edit comment");
        }
        comment.setCommentContent(commentPatchReq.getCommentContent());
        commentRepository.save(comment);
    }

    public void deleteComment(Authentication authentication, long commentId) throws InvalidUserException, InvalidCommentException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> { return new InvalidCommentException("Invalid Comment ID " + commentId); });
        if(!comment.getUser().equals(user)) {
            throw new InvalidUserException("Only comment's owner can delete comment");
        }
        commentRepository.delete(comment);
    }
}

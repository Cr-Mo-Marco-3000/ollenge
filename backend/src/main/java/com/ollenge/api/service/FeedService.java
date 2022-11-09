package com.ollenge.api.service;

import com.ollenge.api.exception.InvalidParticipationException;
import com.ollenge.api.exception.InvalidUserException;
import com.ollenge.api.response.data.FeedGetData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.Challenge;
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
    private final FeedRepositorySupport feedRepositorySupport;

    public List<FeedGetData> getFeedList(Authentication authentication, long challengeId) throws InvalidUserException, InvalidParticipationException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Challenge challenge = Challenge.ChallengeBuilder().challengeId(challengeId).build();
        if(participationRepository.findByChallengeAndUser(challenge, user).isEmpty()) {
            throw new InvalidParticipationException("Not a challenge's member");
        }
        return feedRepositorySupport.getFeedList(challenge);
    }

}

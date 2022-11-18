package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.request.ParticipationPatchReq;
import com.ollenge.api.response.data.BadgeGetData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.db.entity.Badge;
import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.Participation;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.BadgeRepository;
import com.ollenge.db.repository.ChallengeRepository;
import com.ollenge.db.repository.ParticipationRepository;
import com.ollenge.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class ParticipationService {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final ParticipationRepository participationRepository;

    public void changeFlag(Authentication authentication, ParticipationPatchReq participationPatchReq) throws InvalidUserException, InvalidChallengeIdException, InvalidParticipationException, InvalidDateTimeException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        Challenge challenge = challengeRepository.findById(participationPatchReq.getChallengeId())
                .orElseThrow(() -> { return new InvalidChallengeIdException("Invalid challenge ID " + participationPatchReq.getChallengeId()); });
        List<Participation> participationList = participationRepository.findByChallengeAndUser(challenge, user);
        if(participationList.isEmpty()) {
            throw new InvalidParticipationException("Invalid Participation");
        }
        if (isIncompleteChallenge(challenge.getEndDate())) {
            throw new InvalidDateTimeException("Incomplete challenge");
        }
        Participation participation = participationList.get(0);
        participation.setCheckedFlag(true);
        participationRepository.save(participation);
    }

    public boolean isIncompleteChallenge(LocalDate endDate) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        return endDate.compareTo(today) >= 0;
    }
}

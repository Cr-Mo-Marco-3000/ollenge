package com.ollenge.api.service;

import com.ollenge.api.exception.*;
import com.ollenge.api.response.data.UserParticipatedChallengeData;
import com.ollenge.common.util.JwtTokenUtil;
import com.ollenge.common.util.StringUtils;
import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.UserRepository;
import com.ollenge.db.repository.UserRepositorySupport;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;

    public User getUserByUserId(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) return user.get();
        return null;
    }

    public long getUserIdByAuthCode(String authCode) {
        User user = userRepository.findUserByAuthCode(authCode).get();
        return user.getUserId();
    }

    public User updateUserInfo(long userId, String nickname, String profileImg, String userDescription) throws DuplicatedNicknameException, InvalidNicknameException, InvalidUserDescriptionException {
        User user = userRepository.findById(userId).get();

        if (user == null) return null;

        if (nickname != null) {
            if (nickname.length() < 2 || nickname.length() > 14 || !StringUtils.isValidStringWithoutSpace(nickname)) {
                throw new InvalidNicknameException("형식에 맞지 않는 닉네임입니다");
            }
            if (userRepository.findUserByNickname(nickname).isPresent()) {
                throw new DuplicatedNicknameException("이미 존재하는 닉네임입니다");
            }
            user.setNickname(nickname);
            user.setUserFlag(true);
        }

        if (profileImg != null) user.setProfileImg(profileImg);

        if (userDescription != null) {
            if (userDescription.length() > 100) {
                throw new InvalidUserDescriptionException("입력 형식에 맞지 않습니다");
            }
            user.setUserDescription(userDescription);
        }

        return userRepository.save(user);
    }

    public List<UserParticipatedChallengeData> getUserOngoingRankingChallenge(Authentication authentication) throws InvalidChallengeIdException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        List<Challenge> challenge = userRepositorySupport.getUserOngoingUserChallenge(user, true);
        List<UserParticipatedChallengeData> rankingChallengeList = new ArrayList<>();
        for (Challenge item : challenge) {
            rankingChallengeList.add(UserParticipatedChallengeData.of(item));
        }
        return rankingChallengeList;
    }

    public List<UserParticipatedChallengeData> getUserOngoingUserChallenge(Authentication authentication) throws InvalidChallengeIdException, InvalidUserException {
        long userId = JwtTokenUtil.getUserIdByJWT(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> { return new InvalidUserException("Invalid ID " + userId); });
        List<Challenge> challenge = userRepositorySupport.getUserOngoingUserChallenge(user, false);
        List<UserParticipatedChallengeData> userChallengeList = new ArrayList<>();
        for (Challenge item : challenge) {
            userChallengeList.add(UserParticipatedChallengeData.of(item));
        }
        return userChallengeList;
    }

}

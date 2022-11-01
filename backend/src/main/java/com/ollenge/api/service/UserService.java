package com.ollenge.api.service;

import com.ollenge.api.exception.DuplicatedNicknameException;
import com.ollenge.api.exception.InvalidNicknameException;
import com.ollenge.api.exception.InvalidUserDescriptionException;
import com.ollenge.common.util.StringUtils;
import com.ollenge.db.entity.User;
import com.ollenge.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

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

}

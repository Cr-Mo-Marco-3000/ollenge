package com.ollenge.api.service;

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

}

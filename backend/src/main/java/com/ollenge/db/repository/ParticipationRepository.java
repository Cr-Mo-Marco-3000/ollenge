package com.ollenge.db.repository;

import com.ollenge.db.entity.Challenge;
import com.ollenge.db.entity.ClassificationType;
import com.ollenge.db.entity.Participation;
import com.ollenge.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByChallengeAndUser(Challenge challenge, User user);
}
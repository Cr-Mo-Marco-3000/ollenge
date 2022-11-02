package com.ollenge.db.repository;

import com.ollenge.db.entity.AuthClassification;
import com.ollenge.db.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthClassificationRepository extends JpaRepository<AuthClassification, Long> {
    AuthClassification findByChallenge(Challenge challenge);
}
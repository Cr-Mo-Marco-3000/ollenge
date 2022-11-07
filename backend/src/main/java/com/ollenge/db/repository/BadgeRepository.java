package com.ollenge.db.repository;

import com.ollenge.db.entity.Badge;
import com.ollenge.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    List<Badge> findByUser(User user);
}
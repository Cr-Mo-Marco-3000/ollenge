package com.ollenge.db.repository;

import com.ollenge.db.entity.ChallengePreset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengePresetRepository extends JpaRepository<ChallengePreset, Long> {

    List<ChallengePreset> findAll();

}

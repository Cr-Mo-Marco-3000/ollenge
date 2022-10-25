package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChallengePreset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long challengePresetId;

    @Column(nullable = false)
    String challengePresetImg;

    @Column(nullable = false)
    String presetName;

    @Column(length = 50, nullable = false)
    String topic;

    @Column(nullable = false)
    LocalTime startTime;

    @Column(nullable = false)
    LocalTime endTime;

    @Column(length = 100, nullable = false)
    String presetDescription;

}
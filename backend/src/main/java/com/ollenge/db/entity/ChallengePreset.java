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
    String presetImg;

    @Column(length = 50, nullable = false)
    String presetTopic;

    @Column(length = 10, nullable = false)
    String authType;

    @Column(nullable = false)
    LocalTime startTime;

    @Column(nullable = false)
    LocalTime endTime;

    @Column(length = 100, nullable = false)
    String presetDescription;

    @Column
    Integer stepCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classification_type_id")
    ClassificationType classificationType;
}
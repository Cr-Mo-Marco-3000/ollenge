package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long badgeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @Column(length = 10, nullable = false)
    String type;

    @Column(nullable = false)
    @Positive
    int grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_preset_id")
    ChallengePreset challengePreset;

    @Column(nullable = false)
    @CreatedDate
    LocalDateTime createdDatetime;

    @Column(nullable = false)
    boolean badgeFlag;

}
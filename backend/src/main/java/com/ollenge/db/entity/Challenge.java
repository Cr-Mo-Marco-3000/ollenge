package com.ollenge.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
//@Builder(builderMethodName = "ChallengeBuilder")
@Builder(builderMethodName = "ChallengeBuilder")
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long challengeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_preset_id")
    ChallengePreset challengePreset;

    @Column
    String challengeImg;

    @Column(length = 50, nullable = false)
    String challengeName;

    @Column(length = 45, nullable = false)
    String challengeTopic;

    @Column(length = 10, nullable = false)
    String authType;

    @Column(nullable = false)
    LocalDate startDate;

    @Column(nullable = false)
    LocalDate endDate;

    @Column(nullable = false)
    LocalTime startTime;

    @Column(nullable = false)
    LocalTime endTime;

    @Column(length = 8, nullable = false)
    String inviteCode;

    @Column(length = 100)
    String rewardContent;

    @Column(length = 100)
    String penaltyContent;

    @Column(nullable = false, columnDefinition = "int default 0")
    int challengeScore;

    @Column(nullable = false, columnDefinition = "int default 0")
    int peopleCnt;

    @Column(length = 300)
    String challengeDescription;

    @OneToOne(mappedBy = "challenge")
    AuthClassification authClassification;
}
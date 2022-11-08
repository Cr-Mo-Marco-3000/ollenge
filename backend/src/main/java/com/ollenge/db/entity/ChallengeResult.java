package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChallengeResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long challengeResultId;

    @Column(nullable = false)
    int totalCnt;

    @Column(nullable = false)
    int challengeRank;

}
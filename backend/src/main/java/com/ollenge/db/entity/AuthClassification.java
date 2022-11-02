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
public class AuthClassification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long authClassificationId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    Challenge challenge;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classification_type_id", nullable = false)
    ClassificationType classificationType;

}
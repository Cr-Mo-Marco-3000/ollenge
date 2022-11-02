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
public class ClassificationKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long classificationKeywordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classification_type_id", nullable = false)
    ClassificationType classificationType;

    @Column(length = 50, nullable = false)
    String keyword;

}
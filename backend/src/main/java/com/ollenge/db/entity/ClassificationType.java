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
public class ClassificationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long classificationTypeId;

    @Column(length = 30, nullable = false)
    String classificationTypeName;

}
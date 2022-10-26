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
public class AuthStandardImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long authStandardImgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participation_id", nullable = false)
    Participation participation;

    @Column(nullable = false)
    String standardImg;

}
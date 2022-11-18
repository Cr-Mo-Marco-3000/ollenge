package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long participationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    Challenge challenge;

    @Column(nullable = false, columnDefinition = "int default 0")
    int feedCnt;

    @OneToMany(mappedBy = "participation")
    List<Feed> feed;

    @OneToOne(mappedBy = "participation")
    AuthStandardImg authStandardImg;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean checkedFlag;
}
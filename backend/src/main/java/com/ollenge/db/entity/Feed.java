package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long feedId;

    @Column(length = 10, nullable = false)
    String feedType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participation_id", nullable = false)
    Participation participation;

    @Column(nullable = false)
    @CreatedDate
    LocalDateTime createdDatetime;

    @Column(length = 255, nullable = false)
    String feedImg;

    @Column(length = 300)
    String feedContent;

    @OneToMany(mappedBy = "feed")
    List<Comment> comment;
}
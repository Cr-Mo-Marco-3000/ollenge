package com.ollenge.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Example {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long exampleId;

    @Column(length = 15, nullable = false)
    String exampleName;

    @Column(length = 150, nullable = false)
    String password;

    @Column(length = 300, nullable = false)
    String exampleContent;

    @Column(nullable = false)
    @CreatedDate
    LocalDateTime createdDate;

    @LastModifiedDate
    LocalDateTime updatedDate;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "example2_id")
//    Example2 example2;

}
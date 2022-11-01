package com.ollenge.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@DynamicInsert
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long userId;

    @Column(length = 45, nullable = false)
    String authCode;

    @Column(length = 14, nullable = false)
    String nickname;

    @Column(length = 255)
    String profileImg;

    @Column(length = 10, nullable = false)
    String loginType;

    @Column(length = 300)
    String userDescription;

    @Column(nullable = false)
    boolean userFlag;

    @Column(nullable = false, columnDefinition = "int default 0")
    int userScore;

}
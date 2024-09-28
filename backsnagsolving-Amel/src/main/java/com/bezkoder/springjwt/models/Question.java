package com.bezkoder.springjwt.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Question")
    private Long idQuestion;
    @Column(name = "description")
    private String descripition;
    @Column(name = "domain")
    private String domain;
    @Column(name = "userId")
    private String userId;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @PrePersist
    protected void onCreate() {
        date = new Date();
    }

}

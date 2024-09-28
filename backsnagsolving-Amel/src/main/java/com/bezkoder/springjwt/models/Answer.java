package com.bezkoder.springjwt.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_answer")
    private Long idanswer;
    @Column(name = "description")
    private String description;
    @Column(name = "userId")
    private String userId;
    @Column(name = "approve")
    private int approve;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @PrePersist
    protected void onCreate() {
        date = new Date();
    }
    @Column(name = "questionId")
    private Long questionId;

}
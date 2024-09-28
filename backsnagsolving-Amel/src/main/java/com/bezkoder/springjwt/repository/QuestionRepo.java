package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Long> {
    List<Question> getQuestionsByDomain(String domain);

    List<Question> findAllByOrderByDateDesc();
}

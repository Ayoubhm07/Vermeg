package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepo extends JpaRepository<Answer, Long> {
    List<Answer> findAnswerByQuestionId(Long id);

    List<Answer> findAnswersByQuestionIdOrderByDateDesc(Long questionId);

    List<Answer> findAnswersByQuestionIdOrderByApproveDesc(Long questionId);
}

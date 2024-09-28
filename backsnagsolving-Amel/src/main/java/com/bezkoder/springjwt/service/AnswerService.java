package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Answer;
import com.bezkoder.springjwt.repository.AnswerRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AnswerService {

    @Autowired
    private final AnswerRepo answerRepo;

    public Answer saveAnswer(Answer u){
        return answerRepo.save(u);
    }

    public Answer findByIdAnswer(long id){
        return answerRepo.findById(id).orElse(null);
    }

    public List<Answer> findAllAnswer(){
        return answerRepo.findAll();
    }

    public String deleteAnswer(long id){
        answerRepo.deleteById(id);
        return "Answer Deleted!";
    }

}

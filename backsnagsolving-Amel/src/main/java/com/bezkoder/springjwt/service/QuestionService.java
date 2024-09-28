package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Question;
import com.bezkoder.springjwt.repository.QuestionRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService {

    @Autowired
    private final QuestionRepo QuestionRepo;

    public Question savequestion(Question u){
        return QuestionRepo.save(u);
    }

    public Question findByIdQuestion(long id){
        return QuestionRepo.findById(id).orElse(null);
    }

    public List<Question> findAllQuestion(){
        return QuestionRepo.findAll();
    }

    public String deleteQuestion(long id){
        QuestionRepo.deleteById(id);
        return "Question Deleted!";
    }
}

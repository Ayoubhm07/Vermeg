package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Question;
import com.bezkoder.springjwt.repository.QuestionRepo;
import com.bezkoder.springjwt.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @Autowired
    QuestionRepo questionRepo;

    @PostMapping("/save")
    public Question savequestion(@RequestBody Question u){
        return questionService.savequestion(u);
    }

    @GetMapping("/get/{id}")
    public Question findByIdQuestion(@PathVariable Long id){
        return questionService.findByIdQuestion(id);
    }

    @GetMapping("/newest")
    List<Question> GetNewestQuestions(){
        return questionRepo.findAllByOrderByDateDesc();
    }

    @GetMapping("/domains/{domain}")
    List<Question> GetQuestionsByDomains(@PathVariable String domain){
        return questionRepo.getQuestionsByDomain(domain);
    }

    @GetMapping("/all")
    public List<Question> findAllQuestion(){
        return questionService.findAllQuestion();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return "Question Deleted!";
    }

}

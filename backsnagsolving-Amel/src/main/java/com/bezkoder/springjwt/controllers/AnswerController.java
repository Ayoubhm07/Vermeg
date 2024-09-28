package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Answer;
import com.bezkoder.springjwt.repository.AnswerRepo;
import com.bezkoder.springjwt.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/answer")
public class AnswerController {
    @Autowired
    AnswerService answerService;
    @Autowired
    AnswerRepo answerRepo;

    @PostMapping("/save")
    public Answer saveAnswer(@RequestBody Answer u){
        return answerService.saveAnswer(u);
    }

    @GetMapping("/get/{id}")
    public Answer findByIdAnswer(@PathVariable Long id){
        return answerService.findByIdAnswer(id);
    }

    @GetMapping("/all")
    public List<Answer> findAllAnswer(){
        return answerService.findAllAnswer();
    }

    @GetMapping("/byquestion/{id}")
    public List<Answer> findQuestionAnswers(@PathVariable Long id){
        return answerRepo.findAnswerByQuestionId(id);
    }

    @GetMapping("/byapproved/{id}")
    public List<Answer> findQuestionByApproved(@PathVariable Long id){
        return answerRepo.findAnswersByQuestionIdOrderByApproveDesc(id);
    }

    @GetMapping("/newest/{id}")
    public List<Answer> findQuestionByDate(@PathVariable Long id){
        return answerRepo.findAnswersByQuestionIdOrderByDateDesc(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAnswer(@PathVariable Long id){
        answerService.deleteAnswer(id);
        return "Answer Deleted!";
    }

}

package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/notification")
public class NotificationController {

    NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/AllNotifications")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = this.notificationService.getAllNotifications();
        if (notifications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        }
    }

    @PostMapping("/createNotification")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Notification> createEmployee(@RequestBody Notification notification) {
        System.out.println("notification m" + notification);
        System.out.println("test: " + notificationService);
        Notification notification1 = this.notificationService.createNotification(notification);
        return new ResponseEntity<>(notification1, HttpStatus.CREATED);

    }

    @DeleteMapping(value ="/deleteNotification/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteNotification(@PathVariable("id") UUID id) {
        try {
            this.notificationService.deleteNotification(id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

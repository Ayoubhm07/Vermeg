package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Notification;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationService {

    List<Notification> getAllNotifications();

    Optional<Notification> getNotificationById(UUID id);

    Notification createNotification(Notification notification);

    void deleteNotification(UUID id);
}

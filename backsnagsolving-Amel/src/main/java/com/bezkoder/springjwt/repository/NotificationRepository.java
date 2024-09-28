package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
}

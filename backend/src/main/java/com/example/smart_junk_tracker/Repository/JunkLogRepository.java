package com.example.smart_junk_tracker.Repository;

import com.example.smart_junk_tracker.model.JunkLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JunkLogRepository extends JpaRepository<JunkLog, Long> {

    // Getting all logs for a specific user
    List<JunkLog> findByUserId(Long userId);

    // Getting logs for a user within a specific date/time range
    List<JunkLog> findByUserIdAndLoggedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);
}

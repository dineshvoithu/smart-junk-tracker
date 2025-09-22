package com.example.smart_junk_tracker.service;

import com.example.smart_junk_tracker.Repository.JunkFoodRepository;
import com.example.smart_junk_tracker.Repository.JunkLogRepository;
import com.example.smart_junk_tracker.model.JunkFood;
import com.example.smart_junk_tracker.model.JunkLog;
import com.example.smart_junk_tracker.Repository.JunkLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JunkLogService {

    private final JunkLogRepository repo;
    private final JunkFoodRepository junkFoodRepository;

    // Adding new junk log
    public JunkLog addLog(JunkLog junkLog) {
        // ensuring junkfood obj and id exists
        if (junkLog.getJunkFood() != null && junkLog.getJunkFood().getId() != null) {
            JunkFood completeJunkFood = junkFoodRepository.findById(junkLog.getJunkFood().getId())
                    .orElseThrow(() -> new RuntimeException("JunkFood not found with id: " + junkLog.getJunkFood().getId()));
            junkLog.setJunkFood(completeJunkFood);
        }

        return repo.save(junkLog);
    }

    // Getting all logs for a user only
    public List<JunkLog> getLogsByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    // Getting logs for a user on a specific dateandtime
    public List<JunkLog> getLogsByUserAndDate(Long userId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return repo.findByUserIdAndLoggedAtBetween(userId, startOfDay, endOfDay);
    }

    // Add this method to your existing JunkLogService class
    public Map<String, Object> getTotalCaloriesData() {
        List<JunkLog> allLogs = repo.findAll();

        int totalCalories = allLogs.stream()
                .mapToInt(JunkLog::getTotalCalories)
                .sum();

        long totalItems = allLogs.size();

        Map<String, Object> result = new HashMap<>();
        result.put("totalCalories", totalCalories);
        result.put("totalItems", totalItems);

        return result;
    }

}

package com.example.smart_junk_tracker.service;

import com.example.smart_junk_tracker.Repository.JunkLogRepository;
import com.example.smart_junk_tracker.model.JunkFood;
import com.example.smart_junk_tracker.model.JunkLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WarningService {

    private final JunkLogRepository junkLogRepository;

    // Check if user ate same food yesterday
    public boolean ateYesterday(Long userId, Long junkFoodId) {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfYesterday = yesterday.atTime(23, 59, 59);

        List<JunkLog> yesterdayLogs = junkLogRepository
                .findByUserIdAndLoggedAtBetween(userId, startOfYesterday, endOfYesterday);

        return yesterdayLogs.stream()
                .anyMatch(log -> log.getJunkFood().getId().equals(junkFoodId));
    }

    // Count consecutive days of same food
    public int getConsecutiveDays(Long userId, Long junkFoodId) {
        int consecutiveDays = 0;
        LocalDate checkDate = LocalDate.now();

        // Check backwards from today
        for (int i = 0; i < 7; i++) { // Check max 7 days back
            LocalDateTime startOfDay = checkDate.minusDays(i).atStartOfDay();
            LocalDateTime endOfDay = checkDate.minusDays(i).atTime(23, 59, 59);

            List<JunkLog> dayLogs = junkLogRepository
                    .findByUserIdAndLoggedAtBetween(userId, startOfDay, endOfDay);

            boolean ateThisDay = dayLogs.stream()
                    .anyMatch(log -> log.getJunkFood().getId().equals(junkFoodId));

            if (ateThisDay) {
                consecutiveDays++;
            } else {
                break; // Break if no consumption on this day
            }
        }

        return consecutiveDays;
    }

    // Get weekly count of specific food
    public int getWeeklyCount(Long userId, Long junkFoodId) {
        LocalDate weekAgo = LocalDate.now().minusDays(7);
        LocalDateTime startOfWeek = weekAgo.atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        List<JunkLog> weekLogs = junkLogRepository
                .findByUserIdAndLoggedAtBetween(userId, startOfWeek, now);

        return (int) weekLogs.stream()
                .filter(log -> log.getJunkFood().getId().equals(junkFoodId))
                .count();
    }

    // Generate warning message based on pattern
    public String generateWarningMessage(JunkFood junkFood, int consecutiveDays, int weeklyCount,  int todayQuantity) {
        String foodName = junkFood.getName();
        String alternatives = junkFood.getAlternatives();
        String healthRisks = junkFood.getHealthRisks();

        // CHECK DAILY QUANTITY FIRST (Most immediate risk)
        if (todayQuantity >= 3) {
            return String.format(
                    "🔴 EXCESSIVE QUANTITY TODAY!\n" +
                            "You ate %d %s today - That's dangerous!\n" +
                            "Health Risk: %s\n" +
                            "Recommended: Maximum 1-2 per day\n" +
                            "Try Instead: %s",
                    todayQuantity, foodName, healthRisks, alternatives);
        }

        if (consecutiveDays >= 3) {
            return String.format(
                    "🔴 CRITICAL PATTERN DETECTED\n" +
                            "Food: %s (%d+ consecutive days)\n" +
                            "Health Risks: %s\n" +
                            "Immediate Alternatives: %s",
                    foodName, consecutiveDays, healthRisks, alternatives);
        }
        else if (consecutiveDays == 2) {
            return String.format(
                    "⚠️ CONSECUTIVE EATING ALERT\n" +
                            "Food: %s (2 days in a row)\n" +
                            "Health Risk: %s\n" +
                            "Try Instead: %s",
                    foodName, healthRisks, alternatives);
        }
        else if (weeklyCount > junkFood.getMaxWeeklyLimit()) {
            return String.format(
                    "📊 WEEKLY LIMIT EXCEEDED\n" +
                            "Food: %s (%d times this week)\n" +
                            "Recommended: Limit to %d times/week\n" +
                            "Alternatives: %s",
                    foodName, weeklyCount, junkFood.getMaxWeeklyLimit(), alternatives);
        }

        return null; // No warning needed
    }
}

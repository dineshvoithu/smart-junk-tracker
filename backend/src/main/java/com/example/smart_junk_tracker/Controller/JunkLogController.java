package com.example.smart_junk_tracker.Controller;

import com.example.smart_junk_tracker.service.JunkLogService;
import com.example.smart_junk_tracker.service.WarningService;
import com.example.smart_junk_tracker.model.JunkLog;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/logs")
public class JunkLogController {

    private final JunkLogService junkLogService;
    private final WarningService warningService;

    @PostMapping
    public Map<String, Object> addLog(@RequestBody JunkLog junkLog) {
        // log first saving
        JunkLog savedLog = junkLogService.addLog(junkLog);

        // Get user and food details
        Long userId = savedLog.getUserId();
        Long foodId = savedLog.getJunkFood().getId();

        // pattern data
        int consecutiveDays = warningService.getConsecutiveDays(userId, foodId);
        int weeklyCount = warningService.getWeeklyCount(userId, foodId);
        int todayQuantity = savedLog.getQuantity();

        // Generate warning
        String warning = warningService.generateWarningMessage(
                savedLog.getJunkFood(),
                consecutiveDays,
                weeklyCount,
                todayQuantity
        );

        // Return warning
        Map<String, Object> response = new HashMap<>();
        response.put("log", savedLog);
        response.put("warning", warning);

        return response;
    }

    @GetMapping("/user/{userId}")
    public List<JunkLog> getLogsByUser(@PathVariable Long userId) {
        return junkLogService.getLogsByUser(userId);
    }

    @GetMapping("/user/{userId}/date")
    public List<JunkLog> getLogsByUserAndDate(@PathVariable Long userId,
                                              @RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return junkLogService.getLogsByUserAndDate(userId, localDate);
    }

    // Add this endpoint to your existing JunkLogController class
    @GetMapping("/total-calories")
    public Map<String, Object> getTotalCalories() {
        return junkLogService.getTotalCaloriesData();
    }

}

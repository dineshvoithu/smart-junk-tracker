package com.example.smart_junk_tracker.Controller;
import com.example.smart_junk_tracker.service.JunkLogService;
import com.example.smart_junk_tracker.model.JunkLog;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/logs")
public class JunkLogController {

    private final JunkLogService junkLogService;
    @PostMapping
    public JunkLog addLog(@RequestBody JunkLog junkLog){
        return junkLogService.addLog(junkLog);
    }

    @GetMapping("/user/{userId}")
    public List<JunkLog> getLogsByUser(@PathVariable Long userId){
        return junkLogService.getLogsByUser(userId);
    }

    @GetMapping("/user/{userId}/date")
    public List<JunkLog> getLogsByUserAndDate(@PathVariable Long userId,
                                              @RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return junkLogService.getLogsByUserAndDate(userId, localDate);
    }

}

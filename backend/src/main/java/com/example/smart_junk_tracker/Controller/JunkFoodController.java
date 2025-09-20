package com.example.smart_junk_tracker.Controller;

import com.example.smart_junk_tracker.Service.JunkFoodService;
import com.example.smart_junk_tracker.model.JunkFood;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class JunkFoodController {
    private final JunkFoodService junkFoodService;

    @GetMapping("/junkfoods")
    public List<JunkFood> getAllFoods(){
        return junkFoodService.getAllFoods();
    }

    @PostMapping("/junkfoods")
    public JunkFood addJunkFood(@RequestBody JunkFood food){
        return junkFoodService.addFoods(food);
    }



}

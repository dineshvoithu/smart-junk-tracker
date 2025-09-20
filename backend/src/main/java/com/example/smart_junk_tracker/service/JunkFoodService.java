package com.example.smart_junk_tracker.service;

import com.example.smart_junk_tracker.Repository.JunkFoodRepository;
import com.example.smart_junk_tracker.model.JunkFood;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JunkFoodService {

    private final JunkFoodRepository repo;

    public List<JunkFood> getAllFoods(){
        return repo.findAll();
    }

    public JunkFood addFoods(JunkFood junkFood){
        return repo.save(junkFood);
    }



}

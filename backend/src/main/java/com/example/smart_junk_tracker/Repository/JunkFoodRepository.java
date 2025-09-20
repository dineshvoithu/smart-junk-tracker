package com.example.smart_junk_tracker.Repository;

import com.example.smart_junk_tracker.model.JunkFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JunkFoodRepository extends JpaRepository<JunkFood, Long> {

}

package com.example.smart_junk_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JunkLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private int quantity = 1;
    private int totalCalories;
    private LocalDateTime loggedAt;

    @PrePersist
    public void onCreate() {
        this.loggedAt = LocalDateTime.now();
        if (this.junkFood != null) {
            this.totalCalories = this.quantity * this.junkFood.getCalories();
        }
    }

    @ManyToOne(fetch = FetchType.EAGER)  // Changed to EAGER for JSON serialization
    @JoinColumn(name = "junkfood_id")
    private JunkFood junkFood;
}

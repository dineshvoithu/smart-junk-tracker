package com.example.smart_junk_tracker.config;

import com.example.smart_junk_tracker.Repository.JunkFoodRepository;
import com.example.smart_junk_tracker.model.JunkFood;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final JunkFoodRepository junkFoodRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only load data if database is empty
        if (junkFoodRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {


        JunkFood parotta = new JunkFood();
        parotta.setName("Parotta");
        parotta.setTags("oily,fried,refined");
        parotta.setAlternatives("Chapati,Ragi Dosa,Brown Rice");
        parotta.setCalories(250);
        parotta.setNutrition("Carbs:30g,Fat:12g,Protein:5g");
        parotta.setHealthRisks("High calories, trans fats may increase cholesterol");
        parotta.setRiskLevel("HIGH");
        parotta.setRiskCategory("Heart Disease");
        parotta.setMaxWeeklyLimit(2);

        JunkFood pizza = new JunkFood();
        pizza.setName("Pizza");
        pizza.setTags("processed,cheese,high-sodium");
        pizza.setAlternatives("Roti Pizza,Veggie Wrap,Salad");
        pizza.setCalories(300);
        pizza.setNutrition("Carbs:35g,Fat:15g,Protein:12g");
        pizza.setHealthRisks("High sodium, processed cheese causes heart issues");
        pizza.setRiskLevel("CRITICAL");
        pizza.setRiskCategory("Heart Disease");
        pizza.setMaxWeeklyLimit(1);

        JunkFood burger = new JunkFood();
        burger.setName("Burger");
        burger.setTags("fried,processed,high-fat");
        burger.setAlternatives("Veggie Sandwich,Grilled Chicken,Salad Bowl");
        burger.setCalories(350);
        burger.setNutrition("Carbs:40g,Fat:18g,Protein:15g");
        burger.setHealthRisks("Obesity risk, high saturated fats");
        burger.setRiskLevel("HIGH");
        burger.setRiskCategory("Obesity");
        burger.setMaxWeeklyLimit(1);

        // Save to database
        junkFoodRepository.save(parotta);
        junkFoodRepository.save(pizza);
        junkFoodRepository.save(burger);

        System.out.println("✅ Sample junk food data loaded!");
    }
}

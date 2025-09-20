package com.example.smart_junk_tracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HelloController {
    @GetMapping("/home")
   public String healthCheck(){
       return "Dinesh";
   }


}

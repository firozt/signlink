package com.signlink.UserPackage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            Users user1 = new Users(
                "ID_HERE",
                    "NAME_HERE"
            );
            userRepository.save(user1);
        };
    }
}

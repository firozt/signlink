package com.signlink.UserPackage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            List<Users> users = List.of(
                    new Users(
                            "123",
                            "Mark",
                            "mark@mail.com"
                    ),
                    new Users(
                            "124",
                            "George",
                            "geoarge@mail.com"
                    ),
                    new Users(
                            "125",
                            "Michael",
                            "michael@mail.com"

                    )
            );

            userRepository.saveAll(users);
        };
    }
}

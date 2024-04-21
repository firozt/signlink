package com.signlink;


import com.signlink.DictionaryMapping.DictionaryMappingController;
import com.signlink.WordCoursePackage.WordCourseController;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SignlinkConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            DictionaryMappingController controller,
            WordCourseController wordCourseController
            ) {
        return args -> {
            controller.init();
            wordCourseController.init();
        };
    }
}

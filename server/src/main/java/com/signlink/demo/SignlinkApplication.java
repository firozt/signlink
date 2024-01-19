package com.signlink.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SignlinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(SignlinkApplication.class, args);
	}

	@GetMapping
	public String hello() {
		return "Hello world";
	}

}

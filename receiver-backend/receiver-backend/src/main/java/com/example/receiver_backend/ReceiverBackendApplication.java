package com.example.receiver_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class ReceiverBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReceiverBackendApplication.class, args);
	}

}

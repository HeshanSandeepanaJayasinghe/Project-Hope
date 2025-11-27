package com.example.backend;

import com.example.backend.Model.Donor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Hello world");
		Donor donor=new Donor();
		donor.setName("Thinil");
		System.out.println(donor.getName());

	}

}

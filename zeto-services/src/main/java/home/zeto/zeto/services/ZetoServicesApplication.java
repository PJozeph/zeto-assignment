package home.zeto.zeto.services;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories("home.zeto.zeto.services.repository")
public class ZetoServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZetoServicesApplication.class, args);
	}

}

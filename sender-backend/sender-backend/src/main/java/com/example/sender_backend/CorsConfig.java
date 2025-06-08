package com.example.sender_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Tillåt frontend-origin (Angular dev-server)
        config.setAllowedOrigins(List.of("http://localhost:4200","http://localhost:4201"));

        // Tillåt metoder som du behöver
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Tillåt headers som du skickar, t.ex Authorization
        config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));

        // Tillåt cookies om du vill (optional)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Applicera config på alla endpoints
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}

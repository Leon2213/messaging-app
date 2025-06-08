package com.example.receiver_backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable simple broker för topics
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Registrera endpoint för både SockJS och native WebSocket
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:4200") // Din Angular app URL
                .withSockJS(); // För SockJS support

        // Lägg till native WebSocket endpoint
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:4200"); // För native WebSocket
    }
}
package com.example.receiver_backend;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {
    private final SimpMessagingTemplate messagingTemplate;

    public MessageConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @JmsListener(destination = "appmsg-queue")
    public void receiveMessage(String message) {
        System.out.println("Meddelande mottaget: " + message);
        messagingTemplate.convertAndSend("/topic/messages", message);
        System.out.println("Meddelande skickat vidare mot FE");
    }
}

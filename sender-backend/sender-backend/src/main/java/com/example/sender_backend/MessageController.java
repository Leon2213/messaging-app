package com.example.sender_backend;

import com.example.sender_backend.ContentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final JmsTemplate jmsTemplate;

    public MessageController(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    @GetMapping("/greetings")
    public ResponseEntity<ContentDto> greetings() {
        return ResponseEntity.ok(new ContentDto("hello from backend"));
    }

    @PostMapping
    public void sendMessage(@RequestBody Map<String, String> payload) {
        System.out.println("------------- Mottagit meddelande --------------------");
        String message = payload.get("message");
        jmsTemplate.convertAndSend("appmsg-queue", message);
        System.out.println("Skickade: " + message);
    }
}

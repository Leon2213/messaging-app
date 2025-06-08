import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Client, StompConfig } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  public messages$ = new Subject<string>();
  public connectionStatus$ = new BehaviorSubject<string>('disconnected');

  connect() {
    const stompConfig: StompConfig = {
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      connectHeaders: {},
      debug: (str) => {
        console.log('STOMP:', str);
      },
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    };

    this.stompClient = new Client(stompConfig);

    this.stompClient.onConnect = (frame) => {
      console.log('✅ Ansluten till WebSocket');
      this.connectionStatus$.next('connected');
      
      // Lyssna på meddelanden från backend
      this.stompClient.subscribe('/topic/messages', (message) => {
        console.log('📨 Nytt meddelande:', message.body);
        this.messages$.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ WebSocket fel:', frame);
      this.connectionStatus$.next('error');
    };

    this.stompClient.onWebSocketClose = (event) => {
      console.log('🔌 WebSocket stängd');
      this.connectionStatus$.next('disconnected');
    };

    this.stompClient.onWebSocketError = (event) => {
      console.error('❌ WebSocket fel:', event);
      this.connectionStatus$.next('error');
    };

    try {
      this.stompClient.activate();
    } catch (error) {
      console.error('❌ Kunde inte ansluta:', error);
      this.connectionStatus$.next('error');
    }
  }

  disconnect() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('🔌 WebSocket frånkopplad');
    }
  }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}
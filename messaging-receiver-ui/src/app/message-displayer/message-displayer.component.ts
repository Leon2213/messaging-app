import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-message-displayer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './message-displayer.component.html',
  styleUrls: ['./message-displayer.component.scss']
})
export class MessageDisplayerComponent implements OnInit, OnDestroy {
  messages: { timestamp: Date; message: string; type: string }[] = [];
  connectionStatus: string = 'disconnected';
  private messageSub?: Subscription;
  private statusSub?: Subscription;
  
  @ViewChild('logContainer') logContainer!: ElementRef;
  
  constructor(private webSocketService: WebSocketService) {}
  
  ngOnInit() {
    console.log("🚀 Startar message displayer");
    
    // Lyssna på anslutningsstatus
    this.statusSub = this.webSocketService.connectionStatus$.subscribe(status => {
      this.connectionStatus = status;
      console.log(`📡 Status: ${status}`);
    });
    
    // Anslut till WebSocket
    this.webSocketService.connect();
    
    // Lyssna på meddelanden
    this.messageSub = this.webSocketService.messages$.subscribe((msg: string) => {
      console.log("📨 Tog emot meddelande:", msg);
      this.addMessage(msg, 'från backend');
    });
  }
  
  ngOnDestroy() {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
  
  addMessage(msg: string, type: string = 'från backend') {
    this.messages.push({ 
      timestamp: new Date(), 
      message: msg,
      type: type
    });
    this.scrollToBottom();
  }
  
  reconnect() {
    console.log("🔄 Återansluter...");
    this.webSocketService.disconnect();
    setTimeout(() => {
      this.webSocketService.connect();
    }, 1000);
  }
  
  clearMessages() {
    this.messages = [];
  }
  
  private scrollToBottom() {
    setTimeout(() => {
      if (this.logContainer?.nativeElement) {
        this.logContainer.nativeElement.scrollTo({
          top: this.logContainer.nativeElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 0);
  }
}
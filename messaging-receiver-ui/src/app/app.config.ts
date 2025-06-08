// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
//import { WebSocketService } from './websocket.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    //WebSocketService // ✅ Registrera här!
  ]
};

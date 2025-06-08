import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

// Material-moduler
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
  title = 'Skicka meddelande';
  message = '';
  private http = inject(HttpClient);

  sendMessage() {
  const headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('user:password')  // använd dina creds här
  });

  this.http.post('http://localhost:8080/api/messages', 
    { message: this.message }, 
    { headers, withCredentials: true }  // Lägg till withCredentials här
  ).subscribe({
    next: () => {
      alert(`Skickade meddelande: ${this.message}`);
      this.message = '';
    },
    error: err => {
      alert('Fel vid skickande: ' + err.message);
    }
  });
}

}

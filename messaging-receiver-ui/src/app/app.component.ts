import { Component, OnInit } from '@angular/core';
import { MessageDisplayerComponent } from './message-displayer/message-displayer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageDisplayerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    console.log("AppComponent startar");
  }
  
}

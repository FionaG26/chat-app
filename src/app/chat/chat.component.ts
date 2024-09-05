import { Component,OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  messages: string[] = [];
  message: string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}

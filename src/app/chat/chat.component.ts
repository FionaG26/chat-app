import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service'; // Import the socket service

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser: string = 'Guest'; // Logic to manage the current user
  messages: { user: string, text: string, timestamp: Date }[] = [];
  isTyping: boolean = false; // Typing status of other users
  newMessage: string = ''; // The message currently being typed

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // Listen for incoming messages from the socket and add them to the messages array
    this.socketService.getMessage().subscribe((message: any) => {
      this.messages.push({
        user: message.user,
        text: message.text,
        timestamp: new Date(message.timestamp)
      });
    });

    // Listen for typing status updates from the socket
    this.socketService.getTypingStatus().subscribe((status: boolean) => {
      this.isTyping = status;
    });
  }

  // Send the typed message and clear the input field
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        user: this.currentUser, // Current user's identifier
        text: this.newMessage,
        timestamp: new Date()
      };
      this.socketService.sendMessage(message); // Send message through socket
      this.messages.push(message); // Add it to the local messages array
      this.newMessage = ''; // Clear the input field after sending
    }
  }

  // Emit typing status when the user is typing
  onTyping(): void {
    this.socketService.sendTypingStatus(true);
    // Optionally, implement a timeout to stop the typing indicator after a delay
  }
}

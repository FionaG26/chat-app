import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000'; // URL of your backend

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(message: string, room: string): void {
    this.socket.emit('sendMessage', message, room);
  }

  onMessage(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }
}

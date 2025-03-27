import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: Client | null = null;
  private readonly serverUrl = 'http://localhost:8080/chat'; // Change this if needed

  constructor() {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.activate();
  }


  sendMessage(message: any) {
    console.log('Sending message................', message);
    this.stompClient?.publish({ destination: '/app/hello', body: JSON.stringify(message) });
  }

  watch() {
    if(this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/greetings', (greeting: IMessage) => {
      console.log('Received greeting: ', greeting.body);
    });
    }
  }

  disconnect() {
    console.log('Disconnecting from WebSocket...');
  }

}

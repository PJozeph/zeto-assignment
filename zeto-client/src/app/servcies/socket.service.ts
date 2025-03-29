import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { Recording } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: Client | null = null;
  private readonly serverUrl = 'http://localhost:8080/chat';
  private recordListSubject$ = new BehaviorSubject<Recording[]>([]);
  private recordSingleSubject$ = new BehaviorSubject<Recording>(null);

  constructor() {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.activate();
  }

  public getRecordSubject$(): Observable<Recording[]> {
    return this.recordListSubject$.asObservable().pipe(distinctUntilChanged());
  }

  public getRecordSingleSubject$(): Observable<Recording> {
    return this.recordSingleSubject$.asObservable().pipe(distinctUntilChanged());
  }

  public resetRecordSingleSubject(): void {
    this.recordSingleSubject$.next(null);
  }


  sendMessage(message: any): void {
    console.log('Sending message................', message);
    this.stompClient?.publish({ destination: '/app/single', body: JSON.stringify(message) });
  }

  update(message: Recording): void {
    this.stompClient?.publish({ destination: '/app/update', body: JSON.stringify(message) });
  }

  getRecords(): void {
    if (this.stompClient.connected) {
      this.stompClient?.publish({ destination: '/app/records' });
    }
  }

  subscribeToRecordChannel(): void {
    if (this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/records', (greeting: IMessage) => {
        const data: Recording[] = JSON.parse(greeting.body);
        this.recordListSubject$.next(data);
      });
    }
  }

  watchTopicSingle(): void {
    // TODO create response DTO on backend side
    if (this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/single', (message: IMessage) => {
        const data = JSON.parse(message.body);
        const recording: Recording = data.body?.content;
        this.recordSingleSubject$.next(recording);
      });
    }
  }

  watchTopicupdate(): void {
    if (this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/update', (greeting: IMessage) => {
        const data: Recording = JSON.parse(greeting.body);
        console.log('update data', data);
      });
    }
  }

  disconnect(): void {
    console.log('Disconnecting from WebSocket...');
  }

}

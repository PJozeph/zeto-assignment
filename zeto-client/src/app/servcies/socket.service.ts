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
  private readonly serverUrl = 'http://localhost:8080/zeto-records';
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


  getSingleRecord(id: string): void {
    this.stompClient?.publish({ destination: '/app/single', body: JSON.stringify({ id }) });
  }

  update(record: Recording): void {
    this.stompClient?.publish({ destination: '/app/update', body: JSON.stringify(record) });
  }

  getRecordList(): void {
    if (this.stompClient.connected) {
      this.stompClient?.publish({ destination: '/app/records' });
    }
  }

  subscribeToRecordList(): void {
    if (this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/records', (greeting: IMessage) => {
        const data: Recording[] = JSON.parse(greeting.body);
        this.recordListSubject$.next(data);
      });
    }
  }

  subscribeToSingleRecord(): void {
    if (this.stompClient.connected) {
      this.stompClient?.subscribe('/topic/single', (record: IMessage) => {
        const data = JSON.parse(record.body);
        const recording: Recording = data.body?.content;
        this.recordSingleSubject$.next(recording);
      });
    }
  }


  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    } else {
      console.error('Stomp client is not initialized.');
    }
  }

}

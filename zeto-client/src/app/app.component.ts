import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './servcies/socket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'zeto-client';

  private websocketService: SocketService = inject(SocketService);

  ngOnInit(): void {
    setTimeout
      (() => {
        this.websocketService.subscribeToRecordList();
      }, 1000);
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

}

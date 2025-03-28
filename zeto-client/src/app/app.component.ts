import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './servcies/socket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  title = 'zeto-client';

  private websocketService: SocketService = inject(SocketService);
  public dataList$ = this.websocketService.getRecordSubject$();
  public dataSingle$ = this.websocketService.getRecordSingleSubject$();

  ngOnInit(): void {
    setTimeout
      (() => {
        this.websocketService.watchTopic();
      }, 1000);
  }

}

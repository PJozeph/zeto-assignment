import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RecordItemComponent } from '../record-item/record-item.component';
import { SocketService } from '../../servcies/socket.service';

@Component({
  selector: 'app-record-list',
  imports: [CommonModule, RecordItemComponent],
  template: `
  <section class="container" *ngIf="dataList$ | async as data">
    <h1>Record List</h1>
    <div *ngIf="data.length === 0">
        <p>Loading....</p>
    </div>
    <app-record-item *ngFor="let record of data" [record]="record"></app-record-item>
</section>`,
  styleUrl: './record-list.component.less'
})
export class RecordListComponent {
  private websocketService: SocketService = inject(SocketService);
  public dataList$ = this.websocketService.getRecordSubject$();

}

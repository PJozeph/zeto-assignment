import { Component, inject, Input } from '@angular/core';
import { Recording } from '../../models/record';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-record-item',
  imports: [CommonModule, RouterModule],
  template: `
  <div *ngIf="record" class="card" (click)="onClick()">
            {{record.title}}
    </div>`,
  styleUrl: './record-item.component.less'
})
export class RecordItemComponent {

  @Input() record: Recording;
  private router: Router = inject(Router);

  onClick() {
    this.router.navigate(['/record', this.record.id]);
  }

}

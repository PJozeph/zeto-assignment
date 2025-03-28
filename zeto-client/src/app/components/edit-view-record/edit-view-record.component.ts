import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SocketService } from '../../servcies/socket.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-view-record',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-view-record.component.html',
  styleUrl: './edit-view-record.component.less'
})
export class EditViewRecordComponent implements OnInit, OnDestroy {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  websocketService: SocketService = inject(SocketService);
  formBuilder: FormBuilder = inject(FormBuilder);
  private destoryRef: DestroyRef = inject(DestroyRef);
  public dataSingle$ = this.websocketService.getRecordSingleSubject$();


  recordFormGroup: FormGroup = this.formBuilder.nonNullable.group({
    id: [''],
    title: ['foo'],
    description: [''],
    createdAt: [''],
    updatedAt: [''],
    status: ['']
  });

  onSubmit() {
    console.log('Form submitted', this.recordFormGroup.value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.websocketService.watchTopicSingle();
      this.activatedRoute.params.pipe(take(1), takeUntilDestroyed(this.destoryRef)).subscribe((params) => {
        this.websocketService.sendMessage({ id: params['id'] });
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.websocketService.resetRecordSingleSubject();
  }

}

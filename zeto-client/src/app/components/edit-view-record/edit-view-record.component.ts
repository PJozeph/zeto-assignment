import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SocketService } from '../../servcies/socket.service';
import { filter, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Status } from '../../models/record';

@Component({
  selector: 'app-edit-view-record',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-view-record.component.html',
  styleUrl: './edit-view-record.component.less'
})
export class EditViewRecordComponent implements OnInit, OnDestroy {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private websocketService: SocketService = inject(SocketService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private destoryRef: DestroyRef = inject(DestroyRef);
  public dataSingle$ = this.websocketService.getRecordSingleSubject$();
  private router: Router = inject(Router);

  Status = Status;
  recordedOptions = [
    { value: Status.RECORDED, label: 'Recorded' },
    { value: Status.REPORTED, label: 'Reported' },
    { value: Status.SCHEDULED, label: 'Scheduled' },
  ];

  recordFormGroup: FormGroup = this.formBuilder.nonNullable.group({
    id: [''],
    title: ['', Validators.required],
    duration: ['', Validators.required],
    status: ['', Validators.required],
    sedation: ['', Validators.required],
    activation: ['', Validators.required],
  });

  onSubmit(): void {
    this.websocketService.update(this.recordFormGroup.value)
    this.websocketService.getRecordList();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.subscribeToRecordChannelandQueryParams();
    this.setFormGroupValue();
  }

  ngOnDestroy(): void {
    this.websocketService.resetRecordSingleSubject();
  }

  onNavigateRecordsClick(): void {
    this.router.navigate(['']);
  }

  private setFormGroupValue(): void {
    this.dataSingle$.pipe(
      filter((data) => Boolean(data)),
      takeUntilDestroyed(this.destoryRef)).subscribe((record) => {
        this.recordFormGroup.patchValue({
          id: record.id,
          title: record.title,
          duration: record.duration,
          status: record.status,
          sedation: record.sedation,
          activation: record.activation,
        });
        Status.RECORDED === record.status ? this.recordFormGroup.enable() : this.recordFormGroup.disable();
      });
  }


  private subscribeToRecordChannelandQueryParams(): void {
    setTimeout(() => {
      this.websocketService.subscribeToSingleRecord();
      this.activatedRoute.params.pipe(take(1), takeUntilDestroyed(this.destoryRef)).subscribe((params) => {
        this.websocketService.getSingleRecord(params['id']);
      });
    }, 1000);
  }

}

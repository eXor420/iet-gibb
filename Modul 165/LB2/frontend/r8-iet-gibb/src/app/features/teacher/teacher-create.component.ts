import {Component, EventEmitter, Output} from '@angular/core';
import {TeacherDto} from "../../model/teacher.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherRatingDto} from "../../model/teacher-rating.dto";

@Component({
  selector: 'teacher-create-component',
  template: `
    <div class="container">
      <div class="aside"></div>
      <div class="content">
        <h1>Create Teacher</h1>
        <form [formGroup]="formGroup" class="form-layout" (ngSubmit)="save()">
          <div class="input-pair">
            <mat-form-field color="accent">
              <mat-label>Firstname</mat-label>
              <input matInput formControlName="firstname" placeholder="Firstname">
              <mat-error *ngIf="formGroup.controls.firstname.hasError('required')">Firstname is required!</mat-error>
            </mat-form-field>
            <mat-form-field color="accent">
              <mat-label>Lastname</mat-label>
              <input matInput formControlName="lastname" placeholder="Lastname">
              <mat-error *ngIf="formGroup.controls.lastname.hasError('required')">Lastname is required!</mat-error>
            </mat-form-field>
          </div>
          <div class="input-pair">
            <mat-form-field color="accent">
              <mat-label>E-Mail</mat-label>
              <input matInput formControlName="email" placeholder="example@gmx.com">
              <mat-error *ngIf="formGroup.controls.email.hasError('required')">E-Mail is required!</mat-error>
              <mat-error *ngIf="formGroup.controls.email.hasError('email')">Wrong E-Mail format!</mat-error>
            </mat-form-field>
            <mat-form-field color="accent">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="012 345 67 89">
            </mat-form-field>
          </div>
          <div class="actions">
            <button id="cancel" mat-raised-button (click)="cancel.emit()">Cancel</button>
            <button mat-raised-button type="submit">Save</button>
          </div>
        </form>
      </div>
      <div class="aside"></div>
    </div>
  `,
  styles: [`
    .container {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
    }

    h1 {
      margin: 30px 0 60px 0;
      text-align: center;
      font-size: 50px;
    }

    .input-pair, .actions {
      display: flex;
      gap: 10px;
    }

    .actions {
      margin-top: 25px;
    }

    button {
      flex: 1;
      padding: 30px;
    }

    #cancel {
      background-color: rgba(0, 0, 0, 0.2)
    }

    mat-form-field {
      flex: 1;
      opacity: 0.8;
    }

  `]
})
export class TeacherCreateComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() saveTeacher = new EventEmitter<TeacherDto>();

  formGroup: FormGroup<TeacherForm> = this.fb.group({
    firstname: ['', [Validators.required, Validators.maxLength(50)]],
    lastname: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.maxLength(50)]]
  });

  constructor(private readonly fb: FormBuilder) {
  }


  save() {
    if (this.formGroup.valid) {
      let teacher = new TeacherDto();
      teacher.firstname = this.formGroup.controls.firstname.value;
      teacher.lastname = this.formGroup.controls.lastname.value;
      teacher.email = this.formGroup.controls.email.value;
      teacher.phone = this.formGroup.controls.phone.value;
      teacher.ratings = {
        communication: [],
        creativity: [],
        engagement: [],
        knowledge: [],
        receptivenessToFeedback: [],
        supportiveness: []
      } as TeacherRatingDto
      this.saveTeacher.emit(teacher)
    }
  }
}

export class TeacherForm {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
}

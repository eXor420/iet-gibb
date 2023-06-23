import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeacherForm} from "./teacher-create.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherDto} from "../../model/teacher.dto";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import * as TeacherActions from "../../ngrx/actions/teacher.actions";

@Component({
  selector: 'teacher-edit-dialog',
  template: `
    <div class="container">
      <div class="aside"></div>
      <div class="content">
        <h1>Edit {{teacher?.firstname + " " + teacher?.lastname}}</h1>
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
            <button id="cancel" mat-raised-button [mat-dialog-close]="true">Cancel</button>
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
      grid-template-columns: 1fr 5fr 1fr;
      padding: 10px 0 50px 0;
    }

    h1 {
      margin: 30px 0 60px 0;
      text-align: center;
      font-size: 50px;
      color: white;
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
export class TeacherEditDialog {

  teacher: TeacherDto;
  private readonly _dialogRef: MatDialogRef<TeacherEditDialog>;


  formGroup: FormGroup<TeacherForm> = this.fb.group({
    firstname: ['', [Validators.required, Validators.maxLength(50)]],
    lastname: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.maxLength(50)]]
  });

  constructor(private readonly fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: any, private store: Store<AppState>, dialogRef: MatDialogRef<TeacherEditDialog>) {
    this.formGroup.patchValue(data.teacher);
    this.teacher = data.teacher
    this._dialogRef = dialogRef
  }

  save() {
    if (this.formGroup.valid) {
      let newTeacher = {
        ...this.teacher,
        firstname: this.formGroup.controls.firstname.value,
        lastname: this.formGroup.controls.lastname.value,
        email: this.formGroup.controls.email.value,
        phone: this.formGroup.controls.phone.value
      };
      if (newTeacher.firstname !== this.teacher.firstname ||
        newTeacher.lastname !== this.teacher.lastname ||
        newTeacher.email !== this.teacher.email ||
        newTeacher.phone !== this.teacher.phone) {
        this.store.dispatch({type: TeacherActions.SAVE_TEACHER, payload: newTeacher})
      }
      this._dialogRef.close()
    }
  }
}

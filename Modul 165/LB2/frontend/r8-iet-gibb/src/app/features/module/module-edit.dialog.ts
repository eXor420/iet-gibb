import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import * as ModuleActions from "../../ngrx/actions/module.actions";
import {ModuleForm} from "./module-create.component";
import {ModuleDto} from "../../model/module.dto";

@Component({
  selector: 'module-edit-dialog',
  template: `
    <div class="container">
      <div class="aside"></div>
      <div class="content">
        <h1>Edit Module {{module?.number}}</h1>
        <form [formGroup]="formGroup" class="form-layout" (ngSubmit)="save()">
          <div class="input-pair">
            <mat-form-field color="accent">
              <mat-label>Number</mat-label>
              <input matInput formControlName="number" placeholder="Number">
              <mat-error *ngIf="formGroup.controls.number.hasError('required')">Number is required!
              </mat-error>
            </mat-form-field>
            <mat-form-field color="accent">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="Title">
              <mat-error *ngIf="formGroup.controls.title.hasError('required')">Title is required!
              </mat-error>
            </mat-form-field>
          </div>
          <div class="input-pair">
            <mat-form-field color="accent">
              <mat-label>Author</mat-label>
              <input matInput formControlName="author" placeholder="Author">
              <mat-error *ngIf="formGroup.controls.author.hasError('required')">Author is required!
              </mat-error>
            </mat-form-field>
            <mat-form-field color="accent">
              <mat-label>Year</mat-label>
              <input matInput formControlName="year" placeholder="Year">
              <mat-error *ngIf="formGroup.controls.year.hasError('required')">Year is required!
              </mat-error>
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
export class ModuleEditDialog {

  module: ModuleDto;
  private readonly _dialogRef: MatDialogRef<ModuleEditDialog>;


  formGroup: FormGroup<ModuleForm> = this.fb.group({
    number: ['', [Validators.required, Validators.maxLength(3)]],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.maxLength(50)]],
    year: ['', [Validators.required, Validators.maxLength(50)]]
  });

  constructor(private readonly fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: any, private store: Store<AppState>, dialogRef: MatDialogRef<ModuleEditDialog>) {
    this.formGroup.patchValue(data.module);
    this.module = data.module
    this._dialogRef = dialogRef
  }

  save() {
    if (this.formGroup.valid) {
      let newModule = {
        ...this.module,
        number: this.formGroup.controls.number.value,
        title: this.formGroup.controls.title.value,
        author: this.formGroup.controls.author.value,
        year: this.formGroup.controls.year.value
      };
      if (newModule.number !== this.module.number ||
        newModule.title !== this.module.title ||
        newModule.author !== this.module.author ||
        newModule.year !== this.module.year) {
        this.store.dispatch({type: ModuleActions.SAVE_MODULE, payload: newModule})
      }
      this._dialogRef.close();
    }
  }
}

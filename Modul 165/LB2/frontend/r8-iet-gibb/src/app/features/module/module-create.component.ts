import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModuleDto} from "../../model/module.dto";
import {ModuleRatingDto} from "../../model/module-rating.dto";

@Component({
  selector: 'module-create-component',
  template: `
      <div class="container">
          <div class="aside"></div>
          <div class="content">
              <h1>Create Module</h1>
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
export class ModuleCreateComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() saveModule = new EventEmitter<ModuleDto>();

  formGroup: FormGroup<ModuleForm> = this.fb.group({
    number: ['', [Validators.required, Validators.maxLength(3)]],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.maxLength(50)]],
    year: ['', [Validators.required, Validators.maxLength(50)]]
  });

  constructor(private readonly fb: FormBuilder) {
  }


  save() {
    if (this.formGroup.valid) {
      let module = new ModuleDto();
      module.number = this.formGroup.controls.number.value;
      module.title = this.formGroup.controls.title.value;
      module.author = this.formGroup.controls.author.value;
      module.year = this.formGroup.controls.year.value;
      module.ratings = {
        copiedContent: [],
        spelling: [],
        practicability: [],
        understandability: [],
        projectOriented: [],
        technologyDominance: []
      } as ModuleRatingDto
      this.saveModule.emit(module)
    }
  }
}

export class ModuleForm {
  number: FormControl<string>;
  title: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<string>;
}

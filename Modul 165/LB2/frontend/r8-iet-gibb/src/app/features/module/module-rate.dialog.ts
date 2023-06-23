import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {RatingDto} from "../../model/rating.dto";
import * as ModuleActions from "../../ngrx/actions/module.actions";
import {ModuleDto} from "../../model/module.dto";
import {ModuleRatingDto} from "../../model/module-rating.dto";

@Component({
  selector: 'module-rate-dialog',
  template: `
      <div class="container">
          <div class="aside"></div>
          <div class="content">
              <h1>Rate Module {{module?.number}}</h1>
              <div class="form">
                  <div class="input-pair">
                      <div class="input">
                          <label>Spelling:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="spelling">
                          </mat-slider>
                      </div>
                      <div class="input">
                          <label>Technology Dominance:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="technologyDominance">
                          </mat-slider>
                      </div>
                  </div>
                  <div class="input-pair">
                      <div class="input">
                          <label>Practicability:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="practicability">
                          </mat-slider>
                      </div>
                      <div class="input">
                          <label>Understandability:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="understandability">
                          </mat-slider>
                      </div>
                  </div>
                  <div class="input-pair">
                      <div class="input">
                          <label>CopiedContent:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="copiedContent">
                          </mat-slider>
                      </div>
                      <div class="input">
                          <label>Project Oriented:</label>
                          <mat-slider
                                  color="accent"
                                  [max]="100"
                                  [min]="0"
                                  [step]="1"
                                  [discrete]="true">
                              <input matSliderThumb [(ngModel)]="projectOriented">
                          </mat-slider>
                      </div>
                  </div>
              </div>
              <div class="input-pair">
                  <mat-form-field color="accent">
                      <mat-label>Your Firstname</mat-label>
                      <input [required]="true" matInput [(ngModel)]="from" placeholder="Firstname">
                  </mat-form-field>
              </div>
              <div class="actions">
                  <button id="cancel" mat-raised-button [mat-dialog-close]="true">Cancel</button>
                  <button mat-raised-button (click)="save()">Save</button>
              </div>
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

    mat-slider {
      width: 100%;
    }

    label {
      font-size: 18px;
      color: white;
      margin-left: 8px;
    }

    .input {
      width: 94%;
      margin-left: 3%;
      margin-right: 3%;
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
      margin-top: 20px;
    }

    .input {
      flex: 1;
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
export class ModuleRateDialog {
  spelling: number = 50;
  technologyDominance: number = 50;
  practicability: number = 50;
  understandability: number = 50;
  copiedContent: number = 50;
  projectOriented: number = 50;
  from: string = '';

  module: ModuleDto;
  private readonly _dialogRef: MatDialogRef<ModuleRateDialog>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private store: Store<AppState>, dialogRef: MatDialogRef<ModuleRateDialog>) {
    this.module = data.module
    this._dialogRef = dialogRef
  }

  save() {
    if (this.from !== '') {
      let moduleRating = new ModuleRatingDto()
      moduleRating.spelling = [...this.module.ratings.spelling, new RatingDto(this.from, this.spelling)];
      moduleRating.technologyDominance = [...this.module.ratings.technologyDominance, new RatingDto(this.from, this.technologyDominance)];
      moduleRating.practicability = [...this.module.ratings.practicability, new RatingDto(this.from, this.practicability)];
      moduleRating.understandability = [...this.module.ratings.understandability, new RatingDto(this.from, this.understandability)];
      moduleRating.copiedContent = [...this.module.ratings.copiedContent, new RatingDto(this.from, this.copiedContent)];
      moduleRating.projectOriented = [...this.module.ratings.projectOriented, new RatingDto(this.from, this.projectOriented)];
      this.module = {...this.module, ratings: moduleRating};
      this.store.dispatch({type: ModuleActions.SAVE_MODULE, payload: this.module})
      this._dialogRef.close()
    }
  }
}


import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherDto} from "../../model/teacher.dto";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {TeacherRatingDto} from "../../model/teacher-rating.dto";
import {RatingDto} from "../../model/rating.dto";
import * as TeacherActions from "../../ngrx/actions/teacher.actions";

@Component({
  selector: 'teacher-rate-dialog',
  template: `
    <div class="container">
      <div class="aside"></div>
      <div class="content">
        <h1>Rate {{teacher?.firstname + " " + teacher?.lastname}}</h1>
        <div class="form">
          <div class="input-pair">
            <div class="input">
              <label>Knowledge:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="knowledge">
              </mat-slider>
            </div>
            <div class="input">
              <label>Communication:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="communication">
              </mat-slider>
            </div>
          </div>
          <div class="input-pair">
            <div class="input">
              <label>Engagement:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="engagement">
              </mat-slider>
            </div>
            <div class="input">
              <label>Creativity:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="creativity">
              </mat-slider>
            </div>
          </div>
          <div class="input-pair">
            <div class="input">
              <label>Supportiveness:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="supportiveness">
              </mat-slider>
            </div>
            <div class="input">
              <label>Receptiveness to Feedback:</label>
              <mat-slider
                color="accent"
                [max]="100"
                [min]="0"
                [step]="1"
                [discrete]="true">
                <input matSliderThumb [(ngModel)]="receptivenessToFeedback">
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
export class TeacherRateDialog {
  knowledge: number = 50;
  communication: number = 50;
  engagement: number = 50;
  creativity: number = 50;
  supportiveness: number = 50;
  receptivenessToFeedback: number = 50;
  from: string = '';

  teacher: TeacherDto;
  private readonly _dialogRef: MatDialogRef<TeacherRateDialog>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private store: Store<AppState>, dialogRef: MatDialogRef<TeacherRateDialog>) {
    this.teacher = data.teacher
    this._dialogRef = dialogRef
  }

  save() {
    if (this.from !== '') {
      let teacherRating = new TeacherRatingDto()
      teacherRating.knowledge = [...this.teacher.ratings.knowledge, new RatingDto(this.from, this.knowledge)];
      teacherRating.communication = [...this.teacher.ratings.communication, new RatingDto(this.from, this.communication)];
      teacherRating.engagement = [...this.teacher.ratings.engagement, new RatingDto(this.from, this.engagement)];
      teacherRating.creativity = [...this.teacher.ratings.creativity, new RatingDto(this.from, this.creativity)];
      teacherRating.supportiveness = [...this.teacher.ratings.supportiveness, new RatingDto(this.from, this.supportiveness)];
      teacherRating.receptivenessToFeedback = [...this.teacher.ratings.receptivenessToFeedback, new RatingDto(this.from, this.receptivenessToFeedback)];
      this.teacher = {...this.teacher, ratings: teacherRating};
      this.store.dispatch({type: TeacherActions.SAVE_TEACHER, payload: this.teacher})
      this._dialogRef.close()
    }
  }
}


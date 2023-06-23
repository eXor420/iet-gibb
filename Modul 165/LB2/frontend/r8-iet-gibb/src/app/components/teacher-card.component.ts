import {Component, Input} from '@angular/core';
import {TeacherDto} from "../model/teacher.dto";
import {TeacherAbsoluteRatingDto} from "../model/teacher-absolute-rating.dto";
import {RatingDto} from "../model/rating.dto";
import * as TeacherActions from "../ngrx/actions/teacher.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {MatDialog} from "@angular/material/dialog";
import {TeacherEditDialog} from "../features/teacher/teacher-edit.dialog";
import {TeacherRateDialog} from "../features/teacher/teacher-rate.dialog";

@Component({
  selector: 'teacher-card',
  template: `
    <div class="card" (click)="rate()">
      <h1>{{_teacher?.firstname + " " + _teacher?.lastname}}</h1>
      <div class="stats">
        <h2 title="Knowledge">KNO {{teacherAbsoluteRatingDto?.knowledge}}</h2>
        <h2 title="Communication">COM {{teacherAbsoluteRatingDto?.communication}}</h2>
        <h2 title="Engagement">ENG {{teacherAbsoluteRatingDto?.engagement}}</h2>
        <h2 title="Creativity">CRE {{teacherAbsoluteRatingDto?.creativity}}</h2>
        <h2 title="Supportiveness">SUP {{teacherAbsoluteRatingDto?.supportiveness}}</h2>
        <h2 title="Receptiveness to Feedback">REC {{teacherAbsoluteRatingDto?.receptivenessToFeedback}}</h2>
      </div>
      <div class="actions">
        <button mat-icon-button (click)="delete($event)">
          <mat-icon>delete</mat-icon>
        </button>
        <button mat-icon-button (click)="edit($event)">
          <mat-icon>edit</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    button {
      margin: 0 20px;
    }

    mat-icon {
      transform: scale(1.4);
    }

    .card {
      width: 250px;
      height: 320px;
      background-color: #585858;
      border-radius: 25px;
      padding: 5px;
      margin: 15px auto;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      transition: box-shadow 0.5s ease, border-radius 0.5s ease;
    }

    .card:hover {
      box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.5);
      cursor: pointer;
      border-radius: 15px;
    }

    h1, h2 {
      text-align: center;
    }

    h1 {
      font-size: 24px;
      margin: 25px 0 30px 0;
    }

    h2 {
      font-size: 18px;
      position: relative;
    }

    h2::after {
      content: attr(title);
      position: absolute;
      top: -120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #000;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease-in-out;
    }

    h2:hover::after {
      opacity: 1;
      visibility: visible;
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `]
})
export class TeacherCardComponent {

  _teacher: TeacherDto
  teacherAbsoluteRatingDto: TeacherAbsoluteRatingDto

  @Input()
  set teacher(teacher: TeacherDto) {
    this._teacher = teacher
    this.teacherAbsoluteRatingDto = this.createTeacherAbsoluteRatingDto()
  }

  constructor(private store: Store<AppState>, private readonly dialog: MatDialog) {
  }

  createTeacherAbsoluteRatingDto() {
    const teacherAbsoluteRatingDto = new TeacherAbsoluteRatingDto()
    const ratings = this._teacher.ratings
    const knowledgeAverage = this.calculateAverageValue(ratings.knowledge);
    teacherAbsoluteRatingDto.knowledge = knowledgeAverage === -1 ? "-" : knowledgeAverage.toString();
    const communicationAverage = this.calculateAverageValue(ratings.communication);
    teacherAbsoluteRatingDto.communication = communicationAverage === -1 ? "-" : communicationAverage.toString();
    const engagementAverage = this.calculateAverageValue(ratings.engagement);
    teacherAbsoluteRatingDto.engagement = engagementAverage === -1 ? "-" : engagementAverage.toString();
    const creativityAverage = this.calculateAverageValue(ratings.creativity);
    teacherAbsoluteRatingDto.creativity = creativityAverage === -1 ? "-" : creativityAverage.toString();
    const supportivenessAverage = this.calculateAverageValue(ratings.supportiveness);
    teacherAbsoluteRatingDto.supportiveness = supportivenessAverage === -1 ? "-" : supportivenessAverage.toString();
    const receptivenessToFeedbackAverage = this.calculateAverageValue(ratings.receptivenessToFeedback);
    teacherAbsoluteRatingDto.receptivenessToFeedback = receptivenessToFeedbackAverage === -1 ? "-" : receptivenessToFeedbackAverage.toString();

    return teacherAbsoluteRatingDto
  }

  calculateAverageValue(rating: RatingDto[]): number {
    if (rating.length === 0) {
      return -1;
    }

    const sum = rating.reduce((acc, rating) => acc + rating.value, 0);
    return Math.round(sum / rating.length);
  }

  delete(event: Event) {
    event.stopPropagation()
    this.store.dispatch({type: TeacherActions.DELETE_TEACHER, payload: this._teacher._id})
  }

  edit(event: Event) {
    event.stopPropagation()
    this.dialog.open<TeacherEditDialog>(TeacherEditDialog, {
      width: '80vh',
      autoFocus: false,
      data: {
        teacher: this._teacher,
      }
    });
  }

  rate() {
    this.dialog.open<TeacherRateDialog>(TeacherRateDialog, {
      width: '80vh',
      autoFocus: false,
      data: {
        teacher: this._teacher,
      }
    });
  }
}

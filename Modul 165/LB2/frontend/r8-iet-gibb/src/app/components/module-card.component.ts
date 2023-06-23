import {Component, Input} from '@angular/core';
import {RatingDto} from "../model/rating.dto";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {MatDialog} from "@angular/material/dialog";
import {ModuleDto} from "../model/module.dto";
import {ModuleAbsoluteRatingDto} from "../model/module-absolute-rating.dto";
import * as ModuleActions from "../ngrx/actions/module.actions";
import {ModuleEditDialog} from "../features/module/module-edit.dialog";
import {ModuleRateDialog} from "../features/module/module-rate.dialog";

@Component({
  selector: 'module-card',
  template: `
      <div class="card" (click)="rate()">
          <h1>{{_module?.number + " " + _module?.title}}</h1>
          <div class="stats">
              <h2 title="Spelling">SPL {{moduleAbsoluteRatingDto?.spelling}}</h2>
              <h2 title="Technology Dominance">TEC {{moduleAbsoluteRatingDto?.technologyDominance}}</h2>
              <h2 title="Practicability">PRC {{moduleAbsoluteRatingDto?.practicability}}</h2>
              <h2 title="Understandability">UND {{moduleAbsoluteRatingDto?.understandability}}</h2>
              <h2 title="Copied Content">COC {{moduleAbsoluteRatingDto?.copiedContent}}</h2>
              <h2 title="Project Oriented">PRO {{moduleAbsoluteRatingDto?.projectOriented}}</h2>
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
export class ModuleCardComponent {

  _module: ModuleDto
  moduleAbsoluteRatingDto: ModuleAbsoluteRatingDto

  @Input()
  set module(moduleDto: ModuleDto) {
    this._module = moduleDto
    this.moduleAbsoluteRatingDto = this.createModuleAbsoluteRatingDto()
  }

  constructor(private store: Store<AppState>, private readonly dialog: MatDialog) {
  }

  createModuleAbsoluteRatingDto() {
    const moduleAbsoluteRatingDto = new ModuleAbsoluteRatingDto()
    const ratings = this._module.ratings
    const spellingAverage = this.calculateAverageValue(ratings.spelling);
    moduleAbsoluteRatingDto.spelling = spellingAverage === -1 ? "-" : spellingAverage.toString();
    const copiedContentAverage = this.calculateAverageValue(ratings.copiedContent);
    moduleAbsoluteRatingDto.copiedContent = copiedContentAverage === -1 ? "-" : copiedContentAverage.toString();
    const practicabilityAverage = this.calculateAverageValue(ratings.practicability);
    moduleAbsoluteRatingDto.practicability = practicabilityAverage === -1 ? "-" : practicabilityAverage.toString();
    const projectOrientedAverage = this.calculateAverageValue(ratings.projectOriented);
    moduleAbsoluteRatingDto.projectOriented = projectOrientedAverage === -1 ? "-" : projectOrientedAverage.toString();
    const technologyDominanceAverage = this.calculateAverageValue(ratings.technologyDominance);
    moduleAbsoluteRatingDto.technologyDominance = technologyDominanceAverage === -1 ? "-" : technologyDominanceAverage.toString();
    const understandabilityAverage = this.calculateAverageValue(ratings.understandability);
    moduleAbsoluteRatingDto.understandability = understandabilityAverage === -1 ? "-" : understandabilityAverage.toString();

    return moduleAbsoluteRatingDto
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
    this.store.dispatch({type: ModuleActions.DELETE_MODULE, payload: this._module._id})
  }

  edit(event: Event) {
    event.stopPropagation()
    this.dialog.open<ModuleEditDialog>(ModuleEditDialog, {
      width: '80vh',
      autoFocus: false,
      data: {
        module: this._module,
      }
    });
  }

  rate() {
    this.dialog.open<ModuleRateDialog>(ModuleRateDialog, {
      width: '80vh',
      autoFocus: false,
      data: {
        module: this._module,
      }
    });
  }
}

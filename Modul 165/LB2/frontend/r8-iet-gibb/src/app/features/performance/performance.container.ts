import {Component, OnInit} from '@angular/core';
import {TeacherDto} from '../../model/teacher.dto'
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as TeacherSelectors from "../../ngrx/selectors/teacher.selectors"
import * as TeacherActions from "../../ngrx/actions/teacher.actions"
import {Router} from "@angular/router";
import {PerformanceDto} from "../../model/performance.dto";
import {PerformanceService} from "../../service/performance.service";

@Component({
  selector: 'performance-container',
  template: `
      <performance-component [performance]="$performance | async" [performancePg]="$performancePg | async"></performance-component>
  `,
  styles: [``]
})
export class PerformanceContainer implements OnInit{

  $performance: Observable<PerformanceDto>;
  $performancePg: Observable<PerformanceDto>;

  constructor(private store: Store<AppState>, private service: PerformanceService) {
    this.$performance = this.service.get()
    this.$performancePg = this.service.getPg()
  }

  ngOnInit(): void {
  }
}

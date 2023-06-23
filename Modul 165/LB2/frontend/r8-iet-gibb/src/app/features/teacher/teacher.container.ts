import {Component, OnInit} from '@angular/core';
import {TeacherDto} from '../../model/teacher.dto'
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as TeacherSelectors from "../../ngrx/selectors/teacher.selectors"
import * as TeacherActions from "../../ngrx/actions/teacher.actions"
import {Router} from "@angular/router";

@Component({
  selector: 'teacher-container',
  template: `
      <teacher-component [teachers]="($teachers | async)" (createTeacher)="navigateToCreatePage()"></teacher-component>
  `,
  styles: [``]
})
export class TeacherContainer implements OnInit{

  $teachers: Observable<TeacherDto[]>;

  constructor(private store: Store<AppState>, private readonly router: Router) {
    this.$teachers = store.select(TeacherSelectors.selectTeachers);
  }

  ngOnInit(): void {
    this.store.dispatch({type: TeacherActions.LOAD_TEACHERS})
  }

  navigateToCreatePage(){
    this.router.navigate(["/teacher/create"])
  }
}

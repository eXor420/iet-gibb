import {Component} from '@angular/core';
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {TeacherDto} from "../../model/teacher.dto";
import * as TeacherActions from "../../ngrx/actions/teacher.actions"

@Component({
  selector: 'teacher-create-container',
  template: `
    <teacher-create-component (cancel)="navigateToHomePage()" (saveTeacher)="saveTeacher($event)"></teacher-create-component>
  `,
  styles: [``]
})
export class TeacherCreateContainer {

  constructor(private store: Store<AppState>, private readonly router: Router) {
  }

  navigateToHomePage() {
    this.router.navigate(["/teacher"])
  }

  saveTeacher(teacher: TeacherDto) {
    this.store.dispatch({ type: TeacherActions.CREATE_TEACHER, payload: teacher })
  }
}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {TeacherService} from "../../service/teacher.service";
import * as TeacherActions from "./../actions/teacher.actions"
import {Router} from "@angular/router";

@Injectable()
export class TeacherEffects {

  loadTeachers$ = createEffect(() => this.actions$.pipe(
      ofType(TeacherActions.LOAD_TEACHERS),
      mergeMap(() => this.teacherService.getTeachers()
        .pipe(
          map(teachers => ({type: TeacherActions.TEACHERS_LOADED, payload: teachers})),
          catchError(() => EMPTY)
        ))
    )
  );


  createTeacher$ = createEffect(() => this.actions$.pipe(
      ofType(TeacherActions.CREATE_TEACHER),
    // @ts-ignore
      mergeMap((action) => this.teacherService.create(action.payload)
        .pipe(
          map(() => ({type: TeacherActions.TEACHER_CREATED})),
          catchError(() => EMPTY)
        ))
    )
  );

  teacherCreated$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActions.TEACHER_CREATED),
    tap(() => {
      this.router.navigate(["/teacher"])
    })
  ), {dispatch: false});

  saveTeacher$ = createEffect(() => this.actions$.pipe(
      ofType(TeacherActions.SAVE_TEACHER),
      // @ts-ignore
      mergeMap((action) => this.teacherService.save(action.payload)
        .pipe(
          map(() => ({type: TeacherActions.LOAD_TEACHERS})),
          catchError(() => EMPTY)
        ))
    )
  );

  deleteTeacher$ = createEffect(() => this.actions$.pipe(
      ofType(TeacherActions.DELETE_TEACHER),
    // @ts-ignore
      mergeMap((action) => this.teacherService.delete(action.payload)
        .pipe(
          map(() => ({type: TeacherActions.LOAD_TEACHERS})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(private actions$: Actions, private teacherService: TeacherService, private readonly router: Router) {
  }
}

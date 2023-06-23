import { Action } from '@ngrx/store'
import {TeacherDto} from "../../model/teacher.dto";

export const LOAD_TEACHERS       = '[Teachers] Load'
export const TEACHERS_LOADED       = '[Teachers] Loaded'
export const CREATE_TEACHER       = '[Teacher] Create'
export const TEACHER_CREATED       = '[Teacher] Created'
export const SAVE_TEACHER       = '[Teacher] Save'
export const DELETE_TEACHER       = '[Teacher] Delete'

export class LoadTeachers implements Action {
  readonly type = LOAD_TEACHERS
}

export class TeachersLoaded implements Action {
  readonly type = TEACHERS_LOADED

  constructor(public payload: TeacherDto[]) {}
}

export class CreateTeacher implements Action {
  readonly type = CREATE_TEACHER

  constructor(public payload: TeacherDto) {}
}

export class TeacherCreated implements Action {
  readonly type = TEACHER_CREATED

}

export class SaveTeacher implements Action {
  readonly type = SAVE_TEACHER

  constructor(public payload: TeacherDto) {}
}

export class DeleteTeacher implements Action {
  readonly type = DELETE_TEACHER

  constructor(public payload: string) {}
}

export type Actions = CreateTeacher | TeacherCreated | LoadTeachers | TeachersLoaded | DeleteTeacher | SaveTeacher

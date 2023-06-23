import {TeacherState} from "../reducers/teacher.reducer"
import {createSelector} from "@ngrx/store";
import {AppState} from "../index";

export const selectTeacher = (state: AppState) => state.teacher;
export const selectTeachers = createSelector(
  selectTeacher,
  (state: TeacherState) => state.teachers
);

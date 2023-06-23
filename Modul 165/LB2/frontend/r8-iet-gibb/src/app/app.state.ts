import {TeacherState} from "./ngrx/reducers/teacher.reducer";
import {ModuleState} from "./ngrx/reducers/module.reducer";

export interface AppState {
  readonly teacher: TeacherState;
  readonly module: ModuleState;
}

import { TeacherState,  teacherReducer } from './reducers/teacher.reducer';
import { ActionReducerMap } from '@ngrx/store';
import {moduleReducer, ModuleState} from "./reducers/module.reducer";


export const rootReducer = {};

export interface AppState {
  teacher: TeacherState;
  module: ModuleState;
}


export const reducers: ActionReducerMap<AppState, any> = {
  teacher: teacherReducer,
  module: moduleReducer
};

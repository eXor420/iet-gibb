import {createSelector} from "@ngrx/store";
import {AppState} from "../index";
import {ModuleState} from "../reducers/module.reducer";

export const selectModule = (state: AppState) => state.module;
export const selectModules = createSelector(
  selectModule,
  (state: ModuleState) => state.module
);

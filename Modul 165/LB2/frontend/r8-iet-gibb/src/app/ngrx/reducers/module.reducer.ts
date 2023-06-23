import * as ModuleActions from "./../actions/module.actions"
import {ModuleDto} from "../../model/module.dto";

export interface ModuleState {
  module: ModuleDto[];
}

const initialState: ModuleState = {
  module: []
}

export function moduleReducer(state: ModuleState = initialState,
                              action: ModuleActions.Actions): ModuleState {
  switch (action.type) {
    case ModuleActions.MODULES_LOADED:
      return {
        ...state,
        module: action.payload
      };
    default:
      return state;
  }
}

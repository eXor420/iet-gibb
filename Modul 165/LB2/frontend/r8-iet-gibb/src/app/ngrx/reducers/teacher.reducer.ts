import { TeacherDto} from "../../model/teacher.dto";
import * as TeacherActions from "./../actions/teacher.actions"

export interface TeacherState{
  teachers: TeacherDto[];
}

const initialState: TeacherState = {
  teachers: []
}

export function teacherReducer(state: TeacherState = initialState,
                                    action: TeacherActions.Actions): TeacherState {
  switch(action.type){
    case TeacherActions.TEACHERS_LOADED:
      return {
        ...state,
        teachers: action.payload
      };
    default:
      return state;
  }
}

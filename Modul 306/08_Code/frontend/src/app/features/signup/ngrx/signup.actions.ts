import {createAction, props} from '@ngrx/store';
import { SignUpDto } from "../signup.model";

// ngrx actions um sich einen account zu erstellen
export const trySignup = createAction('[signup] try', props<{dto: SignUpDto}>());
export const signupSuccess = createAction('[signup] success', props<{token: string}>());

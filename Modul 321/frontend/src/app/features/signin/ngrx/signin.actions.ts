import {createAction, props} from '@ngrx/store';
import { SigninDto } from "../signin.model";

// ngrx actions um sich anzumelden
export const trySignin = createAction('[signin] try', props<{dto: SigninDto}>());
export const signinSuccess = createAction('[signin] success', props<{token: string}>());

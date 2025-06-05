import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SignupActions from './signup.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY, exhaustMap } from 'rxjs';
import { SignupService } from './signup.service';
import { Router } from "@angular/router";

// effects welche auf die action subscriben
@Injectable()
export class SignupEffects {

    trySignup$ = createEffect(() => this.actions$.pipe(
        ofType(SignupActions.trySignup),
        exhaustMap(action =>
            this.signupService.signup(action.dto).pipe(
                map((token) => {
                    localStorage.setItem('auth_token', token.token);
                    return SignupActions.signupSuccess({token: token.token})
                }),
                catchError(() => EMPTY)
            ))
    ));

    signupSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(SignupActions.signupSuccess), // Listen for the signupSuccess action
                tap(() => {
                    this.router.navigate(['/']); // Navigate to the homepage
                })
            ),
        {dispatch: false} // Set dispatch to false as this effect does not dispatch another action
    );


    constructor(private readonly actions$: Actions,
                private readonly signupService: SignupService,
                private router: Router) {
    }

}

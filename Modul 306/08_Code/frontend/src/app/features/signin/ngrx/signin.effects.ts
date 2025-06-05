import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SigninActions from './signin.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY, exhaustMap } from 'rxjs';
import { SigninService } from './signin.service';
import { Router } from "@angular/router";

// effects welche auf die action subscriben
@Injectable()
export class SigninEffects {

    trySignin$ = createEffect(() => this.actions$.pipe(
        ofType(SigninActions.trySignin),
        exhaustMap(action =>
            this.signinService.signin(action.dto).pipe(
                map((token) => {
                    localStorage.setItem('auth_token', token.token);
                    return SigninActions.signinSuccess({token: token.token})
                }),
                catchError(() => EMPTY)
            ))
    ));

    signinSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(SigninActions.signinSuccess),
                tap(() => {
                    this.router.navigate(['/']);
                })
            ),
        {dispatch: false}
    );


    constructor(private readonly actions$: Actions,
                private readonly signinService: SigninService,
                private router: Router) {
    }

}

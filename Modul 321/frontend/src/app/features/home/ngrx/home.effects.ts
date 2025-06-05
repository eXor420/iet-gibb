import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as HomeActions from './home.actions';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, exhaustMap} from 'rxjs';
import {HomeService} from './home.service';

@Injectable()
export class HomeEffects {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.loadStuff),
    exhaustMap(() =>
        this.homeService.register().pipe(
            map((joke) => HomeActions.stuffLoaded({joke})),
          catchError(() => EMPTY)
        ))
  ));


  constructor(private readonly actions$: Actions,
              private readonly homeService: HomeService) {
  }

}

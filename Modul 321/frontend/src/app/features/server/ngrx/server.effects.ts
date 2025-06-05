import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ServerActions from './server.actions';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, exhaustMap } from 'rxjs';
import { ServerService } from './server.service';
import {deleteServer} from './server.actions';

@Injectable()
export class ServerEffects {

    create$ = createEffect(() => this.actions$.pipe(
        ofType(ServerActions.createServer),
        exhaustMap((action) =>
            this.serverService.create(action.server).pipe(
                map(() => ServerActions.loadServers()),
                catchError(() => EMPTY)
            ))
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(ServerActions.deleteServer),
        exhaustMap((action) =>
            this.serverService.delete(action.serverId).pipe(
                map(() => ServerActions.loadServers()),
                catchError(() => EMPTY)
            ))
    ));

    load$ = createEffect(() => this.actions$.pipe(
        ofType(ServerActions.loadServers),
        exhaustMap(() => this.serverService.loadAll().pipe(
                map((servers) => ServerActions.serversLoaded({servers})),
                catchError(() => EMPTY)
            ))
    ));


    constructor(private readonly actions$: Actions,
                private readonly serverService: ServerService) {
    }

}

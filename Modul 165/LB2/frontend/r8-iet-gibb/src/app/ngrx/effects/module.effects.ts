import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {ModuleService} from "../../service/module.service";
import * as ModuleActions from "./../actions/module.actions"
import {Router} from "@angular/router";

@Injectable()
export class ModuleEffects {

  loadModules$ = createEffect(() => this.actions$.pipe(
      ofType(ModuleActions.LOAD_MODULES),
      mergeMap(() => this.moduleService.getModules()
        .pipe(
          map(modules => ({type: ModuleActions.MODULES_LOADED, payload: modules})),
          catchError(() => EMPTY)
        ))
    )
  );


  createModule$ = createEffect(() => this.actions$.pipe(
      ofType(ModuleActions.CREATE_MODULE),
    // @ts-ignore
      mergeMap((action) => this.moduleService.create(action.payload)
        .pipe(
          map(() => ({type: ModuleActions.MODULE_CREATED})),
          catchError(() => EMPTY)
        ))
    )
  );

  moduleCreated$ = createEffect(() => this.actions$.pipe(
    ofType(ModuleActions.MODULE_CREATED),
    tap(() => {
      this.router.navigate(["/module"])
    })
  ), {dispatch: false});

  saveModule$ = createEffect(() => this.actions$.pipe(
      ofType(ModuleActions.SAVE_MODULE),
      // @ts-ignore
      mergeMap((action) => this.moduleService.save(action.payload)
        .pipe(
          map(() => ({type: ModuleActions.LOAD_MODULES})),
          catchError(() => EMPTY)
        ))
    )
  );

  deleteModule$ = createEffect(() => this.actions$.pipe(
      ofType(ModuleActions.DELETE_MODULE),
    // @ts-ignore
      mergeMap((action) => this.moduleService.delete(action.payload)
        .pipe(
          map(() => ({type: ModuleActions.LOAD_MODULES})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(private actions$: Actions, private moduleService: ModuleService, private readonly router: Router) {
  }
}

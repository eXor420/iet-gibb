import {Action} from '@ngrx/store'
import {ModuleDto} from "../../model/module.dto";

export const LOAD_MODULES = '[Modules] Load'
export const MODULES_LOADED = '[Modules] Loaded'
export const CREATE_MODULE = '[Module] Create'
export const MODULE_CREATED = '[Module] Created'
export const SAVE_MODULE = '[Module] Save'
export const DELETE_MODULE = '[Module] Delete'

export class LoadModules implements Action {
  readonly type = LOAD_MODULES
}

export class ModulesLoaded implements Action {
  readonly type = MODULES_LOADED

  constructor(public payload: ModuleDto[]) {
  }
}

export class CreateModule implements Action {
  readonly type = CREATE_MODULE

  constructor(public payload: ModuleDto) {
  }
}

export class ModuleCreated implements Action {
  readonly type = MODULE_CREATED

}

export class SaveModule implements Action {
  readonly type = SAVE_MODULE

  constructor(public payload: ModuleDto) {
  }
}

export class DeleteModule implements Action {
  readonly type = DELETE_MODULE

  constructor(public payload: string) {
  }
}

export type Actions = CreateModule | ModuleCreated | LoadModules | ModulesLoaded | DeleteModule | SaveModule

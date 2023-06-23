import {Component} from '@angular/core';
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import * as ModuleActions from "../../ngrx/actions/module.actions"
import {ModuleDto} from "../../model/module.dto";

@Component({
  selector: 'module-create-container',
  template: `
    <module-create-component (cancel)="navigateToHomePage()"
                             (saveModule)="saveModule($event)"></module-create-component>
  `,
  styles: [``]
})
export class ModuleCreateContainer {

  constructor(private store: Store<AppState>, private readonly router: Router) {
  }

  navigateToHomePage() {
    this.router.navigate(["/module"])
  }

  saveModule(module: ModuleDto) {
    this.store.dispatch({type: ModuleActions.CREATE_MODULE, payload: module})
  }
}

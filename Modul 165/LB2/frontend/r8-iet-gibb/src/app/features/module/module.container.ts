import {Component, OnInit} from '@angular/core';
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as ModuleSelectors from "../../ngrx/selectors/module.selectors"
import {Router} from "@angular/router";
import {ModuleDto} from "../../model/module.dto";
import * as ModuleActions from "../../ngrx/actions/module.actions";

@Component({
  selector: 'module-container',
  template: `
      <module-component [modules]="($modules | async)" (createModule)="navigateToCreatePage()"></module-component>
  `,
  styles: [``]
})
export class ModuleContainer implements OnInit{

  $modules: Observable<ModuleDto[]>;

  constructor(private store: Store<AppState>, private readonly router: Router) {
    this.$modules = store.select(ModuleSelectors.selectModules);
  }

  ngOnInit(): void {
    this.store.dispatch({type: ModuleActions.LOAD_MODULES})
  }

  navigateToCreatePage(){
    this.router.navigate(["/module/create"])
  }
}

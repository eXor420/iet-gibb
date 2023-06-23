import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from "./components/navbar.component";
import {TeacherContainer} from "./features/teacher/teacher.container";
import {ModuleContainer} from "./features/module/module.container";
import {TeacherComponent} from "./features/teacher/teacher.component";
import {StoreModule} from '@ngrx/store';
import {reducers} from './ngrx/';
import {EffectsModule} from "@ngrx/effects";
import {TeacherEffects} from './ngrx/effects/teacher.effects';
import {HttpClientModule} from "@angular/common/http";
import {TeacherCardComponent} from "./components/teacher-card.component";
import {TeacherCreateContainer} from "./features/teacher/teacher-create.container";
import {TeacherCreateComponent} from "./features/teacher/teacher-create.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {TeacherEditDialog} from "./features/teacher/teacher-edit.dialog";
import {TeacherRateDialog} from "./features/teacher/teacher-rate.dialog";
import {MatSliderModule} from "@angular/material/slider";
import {ModuleComponent} from "./features/module/module.component";
import {ModuleCardComponent} from "./components/module-card.component";
import {ModuleEffects} from "./ngrx/effects/module.effects";
import {ModuleCreateContainer} from "./features/module/module-create.container";
import {ModuleCreateComponent} from "./features/module/module-create.component";
import {ModuleEditDialog} from "./features/module/module-edit.dialog";
import {ModuleRateDialog} from "./features/module/module-rate.dialog";
import {PerformanceContainer} from "./features/performance/performance.container";
import {PerformanceComponent} from "./features/performance/performance.component";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TeacherContainer,
    ModuleContainer,
    TeacherComponent,
    TeacherCardComponent,
    TeacherCreateContainer,
    TeacherCreateComponent,
    TeacherEditDialog,
    TeacherRateDialog,
    ModuleComponent,
    ModuleCardComponent,
    ModuleCreateContainer,
    ModuleCreateComponent,
    ModuleEditDialog,
    ModuleRateDialog,
    PerformanceContainer,
    PerformanceComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([TeacherEffects, ModuleEffects]),

        // Angular Material Stuff
        MatFormFieldModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSliderModule,
        FormsModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

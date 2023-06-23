import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeacherContainer} from "./features/teacher/teacher.container";
import {ModuleContainer} from "./features/module/module.container";
import {TeacherCreateContainer} from "./features/teacher/teacher-create.container";
import {ModuleCreateContainer} from "./features/module/module-create.container";
import {PerformanceContainer} from "./features/performance/performance.container";

const routes: Routes = [
  {path: '', redirectTo: 'teacher', pathMatch: 'full'},
  {path: 'teacher', component: TeacherContainer},
  {path: 'teacher/create', component: TeacherCreateContainer},
  {path: 'module', component: ModuleContainer},
  {path: 'module/create', component: ModuleCreateContainer},
  {path: 'performance', component: PerformanceContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

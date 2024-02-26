import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardcodedFormsComponent } from './forms/hardcoded-forms/hardcoded-forms.component';
import { DynamicFormsComponent } from './forms/dynamic-forms/dynamic-forms.component';

const routes: Routes = [
  { path: 'hardcoded-forms', component: HardcodedFormsComponent, data: { title: 'Hardcoded Forms POC' } },
  { path: 'dynamic-forms', component: DynamicFormsComponent, data: { title: 'Dynamic Forms POC' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

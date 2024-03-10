import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardcodedFormsComponent } from './forms/hardcoded-forms/hardcoded-forms.component';
import { DynamicFormsComponent } from './forms/dynamic-forms/dynamic-forms.component';
import { DynamicReactiveFormsComponent } from './forms/dynamic-reactive-forms/dynamic-reactive-forms.component';
import { SingleOrderCreationComponent } from './forms/single-order-creation/single-order-creation.component';

const routes: Routes = [
  { path: 'hardcoded-forms', component: HardcodedFormsComponent, data: { title: 'Hardcoded Forms POC' } },
  { path: 'dynamic-forms', component: DynamicFormsComponent, data: { title: 'Dynamic Forms POC' } },
  { path: 'dynamic-reactive-forms', component: DynamicReactiveFormsComponent, data: { title: 'Dynamic Forms POC' } },
  { path: 'single-order-creation', component: SingleOrderCreationComponent, data: { title: 'Single Order creation' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

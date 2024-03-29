import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardcodedFormsComponent } from './forms/hardcoded-forms/hardcoded-forms.component';
import { DynamicFormsComponent } from './forms/dynamic-forms/dynamic-forms.component';
import { DynamicReactiveFormsComponent } from './forms/dynamic-reactive-forms/dynamic-reactive-forms.component';
import { SingleOrderCreationComponent } from './forms/single-order-creation/single-order-creation.component';
import { DynamicReactiveFormsV2Component } from './forms/dynamic-reactive-forms-v2/dynamic-reactive-forms-v2.component';
import { OrderDetailsComponent } from './forms/order-details/order-details.component';
import { VendorOrderDetailsComponent } from './forms/vendor-order-details/vendor-order-details.component';
import { InternalUserOrderDetailsComponent } from './forms/internal-user-order-details/internal-user-order-details.component';

const routes: Routes = [
  { path: 'vendor-order-details', component: VendorOrderDetailsComponent, data: { title: 'Hardcoded Forms POC' } },
  { path: 'internal-user-order-details', component: InternalUserOrderDetailsComponent, data: { title: 'Dynamic Forms POC' } },
  { path: 'order-details', component: OrderDetailsComponent, data: { title: 'Order Details' } },
  { path: 'dynamic-reactive-forms-v2', component: DynamicReactiveFormsV2Component, data: { title: 'Dynamic Forms POC' } },
  { path: 'single-order-creation', component: SingleOrderCreationComponent, data: { title: 'Single Order creation' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HardcodedFormsComponent } from './forms/hardcoded-forms/hardcoded-forms.component';
import { DynamicFormsComponent } from './forms/dynamic-forms/dynamic-forms.component';
import { DynamicReactiveFormsComponent } from './forms/dynamic-reactive-forms/dynamic-reactive-forms.component';
import { SingleOrderCreationComponent } from './forms/single-order-creation/single-order-creation.component';
import { DynamicReactiveFormsV2Component } from './forms/dynamic-reactive-forms-v2/dynamic-reactive-forms-v2.component';
import { OrderDetailsComponent } from './forms/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HardcodedFormsComponent,
    DynamicFormsComponent,
    DynamicReactiveFormsComponent,
    SingleOrderCreationComponent,
    DynamicReactiveFormsV2Component,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

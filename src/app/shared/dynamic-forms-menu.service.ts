import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsMenuService {
  constructor( private http: HttpClient) { }


  getMenuData(){
    const dataUrl = "../../../assets/no-contact-inspection-form/form-group-definition.json";


    return this.http.get(dataUrl);
  }
}
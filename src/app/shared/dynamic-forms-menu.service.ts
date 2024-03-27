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

  getForm(formCode: any){
    const dataUrl = "../../../assets/no-contact-inspection-form/forms/"+formCode+".json";
    console.log(dataUrl);
    return this.http.get(dataUrl);
  }
}
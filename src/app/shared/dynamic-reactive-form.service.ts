import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicReactiveFormService {
  formData: any;
  constructor( private http: HttpClient) { }


  getData(){
    const dataUrl = "../../../assets/dynamic-reactive-forms-modified.json";
    return this.http.get(dataUrl);
  }
}
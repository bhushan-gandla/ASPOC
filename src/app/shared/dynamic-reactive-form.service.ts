import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicReactiveFormService {
  formData: any;
  constructor( private http: HttpClient) { }


  getData(){
    const dataUrl = "../../../assets/dynamic-reactive-forms.json";
    this.http.get(dataUrl).subscribe((formData: any) => {
      this.formData = formData;
      console.log(this.formData['sections']['0']['questions']);
      return this.formData;
    });
  }
}
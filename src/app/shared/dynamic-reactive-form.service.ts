import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicReactiveFormService {
  formData: any;
  constructor( private http: HttpClient) { }


  getData(){
    const dataUrl = "../../../assets/GI-response.json";
    // const dataUrl = "../../../assets/DW-DwellingInformation.json";
    // const dataUrl = "../../../assets/DW-DwellingInformation-unique.json";


    return this.http.get(dataUrl);
  }
}
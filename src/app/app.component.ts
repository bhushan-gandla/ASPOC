import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DynamicFormsModel } from './shared/dynamic-forms.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AssetShieldPOC';
  importedDynamicFormsData: DynamicFormsModel[] = [];
  pcrFormPayLoad: {gateCode: string} = {gateCode: ""};
  @ViewChild('pcrForm') pcrForm: NgForm;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer){

  }

  onFetchData(){
    this.getData();
  }
  
  getData(){
    const dataUrl = "../../assets/dynamic-forms-data.json";
    this.http.get(dataUrl).subscribe((res: any) => {
      this.importedDynamicFormsData = res.map((item: any) => {
        return {
          ...item,
          message: this.sanitizer.bypassSecurityTrustHtml(item.message)
        };
      });

      setTimeout(()=>{
        if(document.getElementById("GIGA1")){
          var gateCode = document.getElementById("GIGA1") as HTMLElement;
          gateCode.addEventListener("change", (e: any)=>{
            this.pcrFormPayLoad["gateCode"] = e.target.value;
            console.log(this.pcrFormPayLoad);
          });
        }

      }, 2000)
      console.log(this.importedDynamicFormsData);
    });
  }


  onFormSubmit(){
    console.log(this.pcrForm);
  }

  



  
}

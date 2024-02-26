import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss']
})
export class DynamicFormsComponent {
  importedDynamicFormsData: any = "";
  pcrFormPayLoad: {gateCode: string} = {gateCode: ""};
  formArray: any;
  @ViewChild('pcrForm') pcrForm: NgForm;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer){

  }

  onFetchData(){
    this.getData();
  }
  
  getData(){
    const dataUrl = "../../../assets/dynamic-forms-data.json";
    this.http.get(dataUrl).subscribe((res: any) => {
      // this.importedDynamicFormsData = res.map((item: any) => {
      //   return {
      //     ...item,
      //     message: this.sanitizer.bypassSecurityTrustHtml(item.message)
      //   };
      // });

      const buttons = "<div class='form-group col-12 py-1'>" +
      "<button type='submit' class='btn btn-primary' id='nextBtn' (click)='onFormSubmit()'>Submit <i class='fa fa-angle-right'></i></button>&#160;" +
      "</div>";

      const formHtml = `<form id='dynamicForm' class='form-horizontal'  novalidate='' role='form'><div class='row'> ${this.sanitizer.bypassSecurityTrustHtml(res[0].message)} 
      </div></form>`;
      
      this.importedDynamicFormsData = this.sanitizer.bypassSecurityTrustHtml(formHtml);

      // this.traverseHtmlCode(this.sanitizer.bypassSecurityTrustHtml(res[0].message));
      
    });
  }


  onSubmit(){
    console.log(this.pcrForm);
  }

  traverseHtmlCode(htmlCode: any){
    // console.log(htmlCode.changingThisBreaksApplicationSecurity);
    // if (htmlCode.changingThisBreaksApplicationSecurity.includes('\n')) {
    //   console.log('Moved to next line');
    // }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode.changingThisBreaksApplicationSecurity, 'text/html');
    const formGroups = doc.querySelectorAll('.form-group');
    console.log(formGroups);
    const result:any = [];

    formGroups.forEach((formGroup: any) => {
      const formGroupCode = formGroup;
      const answerId = formGroup.getAttribute('data-answerid');
      const labelInnerHtml = formGroup.querySelector('.control-label').innerHTML.trim();

      const inputElement = formGroup.querySelector('input');

      if (inputElement) {
        const inputType = inputElement.getAttribute('type');
        // const inputName = inputElement.getAttribute('name');
        // const inputBind = inputElement.getAttribute('data-bind');
  
        // const inputType = formGroup.querySelector('input').getAttribute('type');
    
        result.push({
          'data-answerId': answerId,
          'inputType': inputType,
          'labelInnerHtml': labelInnerHtml,
          // 'inputName': inputName,
          // 'inputBind': inputBind,
          'formGroupCode' : inputElement
        });
      }
    });
  
    console.log(result);

  }


}

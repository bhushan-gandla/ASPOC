import { Component, OnInit } from '@angular/core';
import { DynamicFormsMenuService } from 'src/app/shared/dynamic-forms-menu.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
  dataSubscriptionMenu: any;
  dataSubscriptionForm: any;
  formDefinition: any;
  formMenus: any;
  form: any;
  currentFormSelection = 0;

  constructor(private dynamicFormsMenuService: DynamicFormsMenuService){
    this.dataSubscriptionMenu = this.dynamicFormsMenuService.getMenuData().subscribe((formDefinitionData: any) =>{
      this.formDefinition = formDefinitionData;
      // console.log(this.formDefinition.forms);
      this.formMenus = this.formDefinition.forms;

      this.dataSubscriptionForm = this.dynamicFormsMenuService.getForm(this.formMenus[this.currentFormSelection].formCode).subscribe((formData: any) => {
        this.form = formData;
      });
    });


   
  }

  ngOnInit(): void {
    // this.dataSubscriptionForm = this.dynamicFormsMenuService.getForm(this.formMenus[this.currentFormSelection].formCode).subscribe((formData: any) => {
    //   this.form = formData;
    // });
    
  }

  loadForm(formCode: any, index: any){
    this.form = null;
    console.log(formCode);

    this.dataSubscriptionForm = this.dynamicFormsMenuService.getForm(formCode).subscribe((formData: any) => {
      this.form = formData;
      console.log(this.form);
    });

    this.currentFormSelection = index;
  }

  onNextFormSequence(currentIndex: any){
    const nextIndex = currentIndex+1;
    console.log(nextIndex);
    // console.log(this.formMenus[nextIndex]);
    // console.log(this.formMenus[nextIndex]);
    this.loadForm(this.formMenus[nextIndex].formCode, nextIndex);
  }
  
}

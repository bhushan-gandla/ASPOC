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
  formMenu: any;
  form: any;

  constructor(private dynamicFormsMenuService: DynamicFormsMenuService){
    this.dataSubscriptionMenu = this.dynamicFormsMenuService.getMenuData().subscribe((formDefinitionData: any) =>{
      this.formDefinition = formDefinitionData;
      console.log(this.formDefinition.forms);
      this.formMenu = this.formDefinition.forms;
    });
  }

  ngOnInit(): void {
    
  }

  loadForm(formObject: any){
    this.form = null;
    console.log(formObject.formCode);

    this.dataSubscriptionForm = this.dynamicFormsMenuService.getForm(formObject.formCode).subscribe((formData: any) => {
      this.form = formData;
      console.log(this.form);
    })
  }
  
}

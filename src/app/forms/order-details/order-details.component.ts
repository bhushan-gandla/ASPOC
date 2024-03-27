import { Component, OnInit } from '@angular/core';
import { DynamicFormsMenuService } from 'src/app/shared/dynamic-forms-menu.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
  dataSubscription: any;
  constructor(private dynamicFormsMenuService: DynamicFormsMenuService){
    this.dataSubscription = this.dynamicFormsMenuService.getMenuData().subscribe((formMenu: any) =>{
      console.log(formMenu);
    });
  }

  ngOnInit(): void {
    
  }
}

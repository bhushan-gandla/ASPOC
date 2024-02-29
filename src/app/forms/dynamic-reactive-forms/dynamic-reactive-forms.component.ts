import { Component, Input, OnInit } from '@angular/core';
import { DynamicReactiveFormService } from 'src/app/shared/dynamic-reactive-form.service';

@Component({
  selector: 'app-dynamic-reactive-forms',
  templateUrl: './dynamic-reactive-forms.component.html',
  styleUrls: ['./dynamic-reactive-forms.component.scss']
})
export class DynamicReactiveFormsComponent implements OnInit {
  @Input() jsonFormData: any;


  constructor(private dynamicReactiveFormService: DynamicReactiveFormService ){

  }

  ngOnInit(): void {
    this.dynamicReactiveFormService.getData();
  }
}

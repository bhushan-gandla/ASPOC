import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hardcoded-forms',
  templateUrl: './hardcoded-forms.component.html',
  styleUrls: ['./hardcoded-forms.component.scss']
})
export class HardcodedFormsComponent {

  @ViewChild('pcrForm') pcrForm: NgForm;

  onSubmit(){
    console.log(this.pcrForm.value);
    console.log(this.pcrForm.value.emailAddress);
    console.log(this.pcrForm.value.password);
    console.log(this.pcrForm.value.checkMeOut);
  }
}

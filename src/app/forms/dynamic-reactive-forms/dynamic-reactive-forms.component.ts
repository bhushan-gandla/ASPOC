import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicReactiveFormService } from 'src/app/shared/dynamic-reactive-form.service';

@Component({
  selector: 'app-dynamic-reactive-forms',
  templateUrl: './dynamic-reactive-forms.component.html',
  styleUrls: ['./dynamic-reactive-forms.component.scss']
})
export class DynamicReactiveFormsComponent implements OnInit {
  // formDataJson: any;
  formQuestions: any;

  public myForm: FormGroup = this.fb.group({});

  constructor(private dynamicReactiveFormService: DynamicReactiveFormService, private fb: FormBuilder ){

  }

  ngOnInit(): void {
    this.dynamicReactiveFormService.getData().subscribe((formData: any) => {
      // this.formDataJson = formData;
      this.formQuestions = formData['sections']['0']['questions'];
      console.log(this.formQuestions);
      this.createForm(this.formQuestions);
    });
  }

  createForm(questions: any){
    for(const question of questions){
      console.log(question)
      this.myForm.addControl(question['QuestionText'], new FormControl('', Validators.required));
    }
    console.log(this.myForm);
    
  }

  onSubmit(){
    // console.log(this.myForm.valid);
    console.log(this.myForm);
  }
}

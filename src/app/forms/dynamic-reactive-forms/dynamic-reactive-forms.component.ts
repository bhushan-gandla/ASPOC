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
  radioSubQuestionObject: any;
  addressFlag: boolean = false;

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
      this.myForm.addControl(question['QuestionId'], new FormControl('', Validators.required));

      if(question.FieldType == 'radio'){
        for(const radioQuestion of question['Answers']){
          for(const radioSubQuestion of radioQuestion['Questions']){
            // console.log(radioSubQuestion);
            this.myForm.addControl(radioSubQuestion['QuestionId'], new FormControl('', Validators.required));
          }
          // this.myForm.addControl(question['QuestionId'], new FormControl('', Validators.required));
        }
      }
    }
    console.log(this.myForm);
    
  }

  onSubmit(){
    // console.log(this.myForm.valid);
    console.log(this.myForm);
  }

  onRadioButtonChange(radioAddressValue: any, radioSubQuestionObject: any){
    console.log(radioSubQuestionObject);
    for(const radioQuestions of radioSubQuestionObject.Answers){
      if(radioQuestions.Questions.length !== 0){
        this.radioSubQuestionObject = radioQuestions.Questions;
        console.log(this.radioSubQuestionObject);
      }else if (radioQuestions.Questions.length === 0){
        // this.radioSubQuestionObject = [];
      }
    }
    // this.myForm.addControl(this.radioSubQuestionObject.QuestionId, new FormControl('', Validators.required));
    // if(radioAddressValue == 'No'){
    //   this.addressFlag = true;
    // }else if (radioAddressValue == 'Yes'){
    //   this.addressFlag = false;
    // }
  }
}

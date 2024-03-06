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
  subRootQuestionsArray: any = [];

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
      if(question.FieldType == 'text'){
        this.myForm.addControl(question['QuestionId'], new FormControl('Sample text', Validators.required));
      }
      if(question.FieldType == 'date'){
        this.myForm.addControl(question['QuestionId'], new FormControl(new Date(2023, 9, 20), Validators.required));
      }
      if(question.FieldType == 'number'){
        this.myForm.addControl(question['QuestionId'], new FormControl('Sample text', Validators.required));
      }

      if(question.FieldType == 'radio'){
        for(const radioQuestion of question['Answers']){

          this.myForm.addControl(question['QuestionId'], new FormControl(radioQuestion['IsChosenAnswer'], Validators.required));

          // console.log(radioQuestion['AnswerId']);

          for(const radioSubQuestion of radioQuestion['Questions']){
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

  onRadioButtonChange(subRootQuestionIndex: any, rootQuestionObject: any, subRootQuestionIdInput: any){
    // for creating and pushing sub questions
    for(const questionObjectAnswer of rootQuestionObject.Answers){

      // console.log(questionObjectAnswer.AnswerId);
      // console.log(questionObjectAnswer);
     
      // set values to update original object with IsChoseAnswer attribute
      if(questionObjectAnswer.AnswerId === subRootQuestionIdInput){
        questionObjectAnswer.IsChosenAnswer = true;
      }else{
        questionObjectAnswer.IsChosenAnswer = false;
      }
      
      for(const subRootQuestionObject of questionObjectAnswer.Questions){
        // add controls on html and component class if we find inner Question object filled with sub questions
        if(questionObjectAnswer.Questions && questionObjectAnswer.AnswerId === subRootQuestionIdInput){
          subRootQuestionIndex++;
  
          // adding new form controls to the myForm
          this.myForm.addControl(subRootQuestionObject['QuestionId'], new FormControl('Addresses', Validators.required));
  
          // adding new objects to formQuestions array
          this.formQuestions.splice(subRootQuestionIndex, 0, subRootQuestionObject);
        }
      }


      // for removing sub questions
      if(questionObjectAnswer.IsChosenAnswer === true && questionObjectAnswer.Questions.length == 0 ){
        
        for(const questionObjectAnswer of rootQuestionObject.Answers){
          // finding which subRootQ-1 has nested subRootQ-2 
          if(questionObjectAnswer.Questions.length > 0){

            // looping through subRootQ-2
            for(const subRootQuestionObject of questionObjectAnswer.Questions){

              console.log(subRootQuestionObject.QuestionId);

              const index = this.formQuestions.findIndex((item: any) => item.QuestionId === subRootQuestionObject.QuestionId);
              if (index !== -1) {
                // removing subRootQ-2 from formQuestions array
                this.formQuestions.splice(index, 1);
                // removing subRootQ-2 from myForm 
                this.myForm.removeControl(subRootQuestionObject.QuestionId);
              }


            }
          }
        }

      }else{
        // questionObjectAnswer.IsChosenAnswer = false;
      }
      

    }

    console.log(this.formQuestions);

  }
}

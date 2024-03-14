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
  subRootQuestionsFlatArray: any = {};

  public myForm: FormGroup = this.fb.group({});

  constructor(private dynamicReactiveFormService: DynamicReactiveFormService, private fb: FormBuilder ){

  }

  ngOnInit(): void {
    this.dynamicReactiveFormService.getData().subscribe((formData: any) => {
      // this.formDataJson = formData;
      console.log(formData);
      this.formQuestions = formData.sections[0].questions;
      console.log(this.formQuestions);
      this.createForm(this.formQuestions);
    });
  }


  createForm(questions: any){
    for(const question of questions){
      if(question.uiControlType == 'text'){
        this.myForm.addControl(question.questionId, new FormControl('Sample text', Validators.required));
      }
      if(question.uiControlType == 'date'){
        this.myForm.addControl(question.questionId, new FormControl(new Date(2023, 9, 20), Validators.required));
      }
      if(question.uiControlType == 'number'){
        this.myForm.addControl(question.questionId, new FormControl('Sample text', Validators.required));
      }
      if(question.uiControlType == 'select'){
        this.myForm.addControl(question.questionId, new FormControl(Validators.required));
      }

      if(question.uiControlType == 'radio'){
        for(const radioQuestion of question.answers){

          // console.log(radioQuestion.isChosenAnswer);

          this.myForm.addControl(question.questionId, new FormControl(Validators.required));
          // setting value
          // this.myForm.get(question.questionId)!.setValue(radioQuestion.isChosenAnswer);


          // for(const radioSubQuestion of radioQuestion.questions){
          //   this.myForm.addControl(radioSubQuestion.questionId, new FormControl('', Validators.required));
          // }
          // this.myForm.addControl(question.questionId, new FormControl('', Validators.required));
        }
      }
    }
    // console.log(this.myForm);
    
  }

  onSubmit(){
    // console.log(this.myForm.valid);
    console.log(this.myForm);
  }

  onRadioButtonChange(rootQuestionIndex: any, rootQuestionObject: any, rootQuestionIdInput: any){
    console.log(rootQuestionObject  );
    // console.log(rootQuestionObject);
    // for creating and pushing sub questions
    const subRootQuestionAnswerArray = rootQuestionObject.answers;
    for(const questionObjectAnswer of subRootQuestionAnswerArray){

      // console.log(questionObjectAnswer.answerId);
      // console.log(questionObjectAnswer);
     
      // set values to update original object with IsChoseAnswer attribute
      if(questionObjectAnswer.answerId === rootQuestionIdInput){
        questionObjectAnswer.isChosenAnswer = true;
      }else{
        questionObjectAnswer.isChosenAnswer = false;
      }
      
      
      for(const subRootQuestionObject1 of questionObjectAnswer.questions){

        if(questionObjectAnswer.isChosenAnswer === true){
        // if selected object is true we are adding question objects

          // add controls on html and component class if we find inner Question object filled with sub questions
          rootQuestionIndex++;

          // adding new objects to formQuestions array
          this.formQuestions.splice(rootQuestionIndex, 0, subRootQuestionObject1);
          
          // console.log(subRootQuestionObject1);
          // adding new form controls to the myForm
          this.myForm.addControl(subRootQuestionObject1.questionId, new FormControl(Validators.required));
          // setting value
          this.myForm.get(subRootQuestionObject1.questionId)!.setValue(subRootQuestionObject1.answers[0].answerText);
          
          // check if there is empty array, if it doesn't exist, create a new array 
          // console.log(rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId)
          if(!this.subRootQuestionsFlatArray[rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId]){
            this.subRootQuestionsFlatArray[rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId] = [];
          }

          // do not duplicate existing subRootQuestion questionIds
          if (!this.subRootQuestionsFlatArray[rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId].includes(subRootQuestionObject1.questionId)) {
            this.subRootQuestionsFlatArray[rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId].push(subRootQuestionObject1.questionId);
          }
         
        }

        // if selected object is false we are removing removing objects
        if(questionObjectAnswer.isChosenAnswer === false){

          // looping through flat Array
          for (let key in this.subRootQuestionsFlatArray) {
            // console.log(`${key}: ${this.subRootQuestionsFlatArray[key]}`);

            // simple use case of hiding one level deep questionIds inside the flat array
            if(key.split("-")[0] === rootQuestionObject.questionId && key.split("-")[1] === questionObjectAnswer.answerId){
              
              console.log(this.subRootQuestionsFlatArray[key]);
              for(const childrenQuestionIds of this.subRootQuestionsFlatArray[key]){
                const index = this.formQuestions.findIndex((item: any) => item.questionId === childrenQuestionIds);
                if (index !== -1) {
                  // removing subRootQ-2 from formQuestions array
                  this.formQuestions.splice(index, 1);
                  // removing subRootQ-2 from myForm 
                  this.myForm.removeControl(subRootQuestionObject1.questionId);
                }


                // finding siblings
                for(let innerKey in this.subRootQuestionsFlatArray){
                  if(innerKey.split("-")[0] === childrenQuestionIds){
                    for(const innerChildrenQuestionIds of this.subRootQuestionsFlatArray[innerKey]){

                      const index = this.formQuestions.findIndex((item: any) => item.questionId === innerChildrenQuestionIds);
                      if (index !== -1) {
                        // removing subRootQ-2 from formQuestions array
                        this.formQuestions.splice(index, 1);
                        // removing subRootQ-2 from myForm 
                        this.myForm.removeControl(subRootQuestionObject1.questionId);
                      }
                    }
                  }

                }



              }
            }
          }
        }
      }

    }

    console.log(this.formQuestions);
    console.log(this.subRootQuestionsFlatArray);
  }
}

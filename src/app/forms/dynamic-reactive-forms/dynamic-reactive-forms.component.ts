import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicReactiveFormService } from 'src/app/shared/dynamic-reactive-form.service';

@Component({
  selector: 'app-dynamic-reactive-forms',
  templateUrl: './dynamic-reactive-forms.component.html',
  styleUrls: ['./dynamic-reactive-forms.component.scss']
})
export class DynamicReactiveFormsComponent implements OnInit, OnDestroy {
  // formDataJson: any;
  formQuestions: any;
  unitId: any;
  subRootQuestionsFlatArray: any = {};
  response: any = [];
  dataSubscription: any;

  public myForm: FormGroup = this.fb.group({});

  constructor(private dynamicReactiveFormService: DynamicReactiveFormService, private fb: FormBuilder ){

  }

  ngOnInit(): void {
    this.dataSubscription = this.dynamicReactiveFormService.getData().subscribe((formData: any) => {
      // this.formDataJson = formData;
      // console.log(formData);
      this.unitId = formData.unitId;
      this.formQuestions = formData.sections[0].questions;
      console.log(this.formQuestions);
      this.createForm(this.formQuestions);
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.formQuestions = null;
    this.myForm.reset();
  }


  createForm(questions: any){
    for(const question of questions){

      const formControlName = this.unitId+"-"+question.questionId; 
      if(question.uiControlType == 'text'){
        for(let answers of question.answers){
          this.myForm.addControl(this.unitId+"-"+question.questionId+"-"+answers.answerId, new FormControl(answers.answerText, question.isRequired ? Validators.required: null));
        }
      }
      if(question.uiControlType == 'date'){
        for(let answers of question.answers){
          this.myForm.addControl(this.unitId+"-"+question.questionId+"-"+answers.answerId, new FormControl(answers.answerText, question.isRequired ? Validators.required: null));
        }
      }
      if(question.uiControlType == 'number'){
        for(let answers of question.answers){
          this.myForm.addControl(this.unitId+"-"+question.questionId+"-"+answers.answerId, new FormControl(answers.answerText, question.isRequired ? Validators.required: null));
        }
      }
      if(question.uiControlType == 'select'){
        for(let answers of question.answers){
          this.myForm.addControl(this.unitId+"-"+question.questionId, new FormControl(answers.answerId, question.isRequired ? Validators.required: null));
        }
      }

      if(question.uiControlType == 'radio'){
        this.myForm.addControl(this.unitId+"-"+question.questionId, new FormControl(false, question.isRequired ? Validators.required: null));
        // for(const answers of question.answers){
        //   if(answers.isChosenAnswer === true){
        //     this.myForm.addControl(this.unitId+"-"+question.questionId, new FormControl(answers.answerText, question.isRequired ? Validators.required: null));
        //   }else{
        //     this.myForm.addControl(this.unitId+"-"+question.questionId, new FormControl(false, question.isRequired ? Validators.required: null));
        //   }
        // }
      }
      if(question.uiControlType == 'checkbox'){
        for(const answers of question.answers){
          this.myForm.addControl(this.unitId+"-"+question.questionId+"-"+answers.answerId, new FormControl(false,question.isRequired ? Validators.required: null));
        }
      }
    }
    console.log(this.myForm);
    
  }

  onSubmit(){

    this.createResponseObject(this.myForm);

    this.response = [];
  }

  onFormChange(rootQuestionIndex: any, rootQuestionObject: any, rootQuestionIdInput: any){
    // console.log(rootQuestionObject);
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
        const formControlName = this.unitId+"-"+subRootQuestionObject1.questionId;
        if(questionObjectAnswer.isChosenAnswer === true){
        // if selected object is true we are adding question objects

          // add controls on html and component class if we find inner Question object filled with sub questions
          rootQuestionIndex++;

          // adding new objects to formQuestions array
          this.formQuestions.splice(rootQuestionIndex, 0, subRootQuestionObject1);
          
          // console.log(subRootQuestionObject1);
          // adding new form controls to the myForm and calling createForm to create the whole form
          this.createForm(this.formQuestions);

          // check if there is empty array, if it doesn't exist, create a new array 
          // console.log(rootQuestionObject.questionId+"-"+questionObjectAnswer.answerId)
          if(!this.subRootQuestionsFlatArray[rootQuestionObject.questionId]){
            this.subRootQuestionsFlatArray[rootQuestionObject.questionId] = [];
          }

          // do not duplicate existing subRootQuestion questionIds
          if (!this.subRootQuestionsFlatArray[rootQuestionObject.questionId].includes(subRootQuestionObject1.questionId+"-"+questionObjectAnswer.answerId)) {
            this.subRootQuestionsFlatArray[rootQuestionObject.questionId].push(subRootQuestionObject1.questionId+"-"+questionObjectAnswer.answerId);
          }
         
        }

        // if selected object is false we are removing removing objects
        if(questionObjectAnswer.isChosenAnswer === false){

          // looping through question ids in book keeping array
          for (let key in this.subRootQuestionsFlatArray) {

            // looping through array values inside question ids in book keeping array
            for(const innerValue of this.subRootQuestionsFlatArray[key]){

              // checking if the questionId and answer id match by splitting the string value inside the array
              if(innerValue.split('-')[1] === questionObjectAnswer.answerId && innerValue.split('-')[0] === subRootQuestionObject1.questionId){

                console.log(subRootQuestionObject1.questionId); 
                
                // removing the questions 
                const index = this.formQuestions.findIndex((item: any) => item.questionId === subRootQuestionObject1.questionId);
                if (index !== -1) {
                  console.log(subRootQuestionObject1.questionId +"-"+index)
                  // this.formQuestions.splice(index, 1);
                  // this.myForm.removeControl(this.unitId+'-'+subRootQuestionObject1.questionId);
                }



                for(let innerKey in this.subRootQuestionsFlatArray){
                  if(innerValue.split('-')[0] === innerKey){
                    
                    for(const innerKeyValue of this.subRootQuestionsFlatArray[innerKey]){
                      
                      const innerChildrenQuestionIds = innerKeyValue.split("-")[0];
                      // console.log('matches' + innerChildrenQuestionIds);
  
                      const index = this.formQuestions.findIndex((item: any) => item.questionId === innerChildrenQuestionIds);
                      if (index !== -1) {
                        this.formQuestions.splice(index, 1);
                        this.myForm.removeControl(this.unitId+'-'+innerChildrenQuestionIds);
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

    // console.log(this.formQuestions);
    // console.log(this.subRootQuestionsFlatArray);
  }


  createResponseObject(myForm: FormGroup){
      // console.log(myForm);

      const controls = myForm.controls;

      for(let key in controls){
        if(controls[key].touched === true || controls[key].value){
          let unitId = key.split("-")[0];
          let questionId = key.split("-")[1];
          let answerValue = controls[key].value;
          let answerId;
          key.split("-")[2] ? answerId=key.split("-")[2]: '';

          // filter items in formQuestions and extract answerIds if radio and select
          let rootQuestionObject = this.formQuestions.filter((item: any) => item.questionId === questionId);
          // console.log(rootQuestionObject);
          if(rootQuestionObject[0].uiControlType === 'radio'){
            for(const rootAnswers of rootQuestionObject[0].answers){
              if(rootAnswers.isChosenAnswer === true){
                answerId = rootAnswers.answerId;
              }
            }
          }

          this.response.push({
            questionId: questionId,
            answerId: answerId,
            unitId: unitId,
            answerValue: answerValue
          });
        }
      }
      console.log(this.response);
  } 
}

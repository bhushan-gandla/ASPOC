import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicReactiveFormService } from 'src/app/shared/dynamic-reactive-form.service';

@Component({
  selector: 'app-dynamic-reactive-forms-v2',
  templateUrl: './dynamic-reactive-forms-v2.component.html',
  styleUrls: ['./dynamic-reactive-forms-v2.component.scss']
})
export class DynamicReactiveFormsV2Component implements OnInit{

  dataSubscription: any;
  formData: any;
  formQuestions: any;
  unitId: any;
  isChosenQuestions: any = [];
  public form: FormGroup = this.fb.group({});
  bookKeepingQuestions: any = [];
  formResponse: any = [];

  
  constructor(private dynamicReactiveFormService: DynamicReactiveFormService, private fb: FormBuilder ){

  }

  ngOnInit(): void {
    this.dataSubscription = this.dynamicReactiveFormService.getData().subscribe((formDataJson: any) => {
      this.unitId = formDataJson.unitId;
      this.formQuestions = formDataJson.sections[0].questions;
      this.createFormQuestions();
      this.createForm();
    });
  }


  // creates form questions. When it is called:
  // 1. On Init it creates a flat array by looping through questions and adding questions with isChosenAnswer is true
  // 2. When form detects a change. Ex: When radio buttons are changed
  createFormQuestions(){
    this.formQuestions.forEach((questions: any, questionIndex: any) => {
      this.getChosenAnswers(questions);
    });

    console.log(this.isChosenQuestions);

    for(let key in this.isChosenQuestions){
      let index = this.formQuestions.findIndex((item: any) => item.questionId === this.isChosenQuestions[key].questionId);
      index++;
      if (index !== -1) {
        this.formQuestions.splice(index, 0, ...this.isChosenQuestions[key].questions);
      }
    }

    this.isChosenQuestions = [];

    console.log(this.formQuestions);
    // console.log(this.bookKeepingQuestions);
  }

  getChosenAnswers(questions: any){
    questions.answers.forEach((answers: any, answerIndex: any)=>{
      if(answers.isChosenAnswer === true && answers.questions.length > 0){

        this.isChosenQuestions.push({
          questionId: questions.questionId,
          questions: answers.questions
        });

        // created a questionId
        if(!this.bookKeepingQuestions[questions.questionId]){
          this.bookKeepingQuestions[questions.questionId] = [];
        }

        for(let i=0; i<answers.questions.length; i++){
          this.getChosenAnswers(answers.questions[i]);
          // do not duplicate existing
          if(!this.bookKeepingQuestions[questions.questionId].includes(answers.questions[i].questionId+"-"+answers.answerId)) {
            this.bookKeepingQuestions[questions.questionId].push(answers.questions[i].questionId+"-"+answers.answerId);
          }
        }
      }
    });
  }


  createForm(){
    for(const question of this.formQuestions){
      switch(question.uiControlType){
        case 'text':
        case 'date':
        case 'number':{
          for(let answers of question.answers){
            this.form.addControl(question.questionId, new FormControl(answers.answerText, question.isRequired ? Validators.required: null));
          }
          break;
        }
        case 'select':{
          for(let answers of question.answers){
            this.form.addControl(question.questionId, new FormControl(answers.answerId, question.isRequired ? Validators.required: null));
          }
          break;
        }
        case 'radio':{
          this.form.addControl(question.questionId, new FormControl(question.isRequired ? Validators.required: null));
          for(let answers of question.answers){
            if(answers.isChosenAnswer === true){
              this.form.get(question.questionId)!.setValue(answers.answerText);
            }
          }
          break;
        }
        case 'checkbox':{
          for(let answers of question.answers){
            this.form.addControl(question.questionId+"-"+answers.answerId, new FormControl(answers.isChosenAnswer === true ? true : false, question.isRequired ? Validators.required: null));
          }
          break;
        }
      }
    }
  }

  onFormChange(questionIndex: any, question: any, answerAnswerId: any){
      const answers = question.answers;
      for(const answer of answers){
        if(answer.answerId === answerAnswerId){
          answer.isChosenAnswer = true;
        }else{
          answer.isChosenAnswer = false;
        }
      }
      for(const answer of answers){
        if(answer.isChosenAnswer === true && answer.answerId === answerAnswerId){
          this.getChosenAnswers(question);
          for(let key in this.isChosenQuestions){
            let index = this.formQuestions.findIndex((item: any) => item.questionId === this.isChosenQuestions[key].questionId);
            index++;
            if (index !== -1) {
              this.formQuestions.splice(index, 0, ...this.isChosenQuestions[key].questions);
            }
          }
          this.isChosenQuestions = [];
          // console.log(this.formQuestions);
          // console.log(this.bookKeepingQuestions);
        } 

        if(answer.isChosenAnswer === false){
          for(const subQuestions of answer.questions){
            for (let key in this.bookKeepingQuestions){
              for(const innerValue of this.bookKeepingQuestions[key]){
                if(innerValue.split('-')[1] === answer.answerId && innerValue.split('-')[0] === subQuestions.questionId){
                  this.removeQuestions(subQuestions.questionId);
                  for(let innerKey in this.bookKeepingQuestions){
                    if(innerValue.split('-')[0] === innerKey){
                      for(const innerKeyValue of this.bookKeepingQuestions[innerKey]){
                        this.removeQuestions(innerKeyValue.split("-")[0]);
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
      this.createForm();
  }

  removeQuestions(questionId: any){
    const index = this.formQuestions.findIndex((item: any) => item.questionId === questionId);
    if (index !== -1) {
      this.formQuestions.splice(index, 1);
      this.form.removeControl(questionId);
    }
  }
  onSubmit(){
    this.formResponse = [];
    const formControls = this.form.controls;
    for(let key in formControls){
      if((typeof formControls[key].value) !== 'function'){
        console.log(typeof formControls[key].value);
        let answerId = "";
        let questionId = "";
        if(key.includes("-")){
          questionId = key.split("-")[0];
          answerId = key.split("-")[1];
        }else{
          const question = this.formQuestions.filter((item: any) => item.questionId === key);
          questionId = key;
          for(const answer of question[0].answers){
            if(answer.isChosenAnswer){
              answerId = answer.answerId;
            }else{
              answerId = answer.answerId;
            }
          }
        }
        if(formControls[key].value){
          this.formResponse.push({
            questionId: questionId,
            answerId: answerId,
            unitId: this.unitId,
            answerValue: formControls[key].value
          });
        }
      }
    }
    console.log(this.form);
    console.log(this.formResponse);
  }

}

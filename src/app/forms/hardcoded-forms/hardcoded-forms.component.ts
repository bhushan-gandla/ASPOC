import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-hardcoded-forms',
  templateUrl: './hardcoded-forms.component.html',
  styleUrls: ['./hardcoded-forms.component.scss']
})
export class HardcodedFormsComponent {
  form: FormGroup;
  formData: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Simulated JSON data
    this.formData = {
      "formGroupTitle": "General Information",
      "formGroupCode": "GI",
      "sections": [
        {
          "sectionTitle": "General",
          "sequenceNumber": 0,
          "sectionCode": "GIGNRL",
          "questions": [
            {
              "questionId": "GIID1",
              "questionText": "Inspection Date 1:",
              "isRequired": true,
              "isReadOnly": false,
              "uiControlType": "date",
              "answers": [
                {
                  "answerId": "GIID11",
                  "answerText": "GIID11",
                  "isChosenAnswer": false,
                  "questions": []
                }
              ]
            },
            {
              "questionId": "GIID2",
              "questionText": "Inspection Date 2:",
              "isReadOnly": false,
              "uiControlType": "date",
              "answers": [
                {
                  "answerId": "GIID21",
                  "answerText": "GIID21",
                  "isChosenAnswer": false,
                  "questions": []
                }
              ]
            },
            {
              "questionId": "GIII",
              "questionText": "Inspector Unique ID:",
              "isRequired": true,
              "isReadOnly": false,
              "uiControlType": "text",
              "responseMaxLen": 25,
              "answers": [
                {
                  "answerId": "GIII",
                  "answerText": "",
                  "isChosenAnswer": false,
                  "questions": []
                }
              ]
            },
            {
              "questionId": "GICRA",
              "questionText": "Corrected Address:",
              "questionType": "QuestionAndSingleAnswerRadioButton",
              "isRequired": true,
              "isReadOnly": false,
              "answers": [
                {
                  "answerId": "GICRA1",
                  "answerText": "Yes",
                  "isChosenAnswer": true,
                  "questions": [
                    {
                      "questionId": "GIA1",
                      "questionText": "Address 1:",
                      "isRequired": false,
                      "isReadOnly": false,
                      "uiControlType": "text",
                      "answers": [
                        {
                          "answerId": "GIA11",
                          "answerText": "1234 Elm St",
                          "isChosenAnswer": false,
                          "questions": []
                        }
                      ],
                      "parent": {
                        "answerId": "GICRA1"
                      }
                    },
                    {
                      "questionId": "GIA2",
                      "questionText": "Address 2:",
                      "isRequired": false,
                      "isReadOnly": false,
                      "uiControlType": "text",
                      "answers": [
                        {
                          "answerId": "GIA21",
                          "answerText": "",
                          "isChosenAnswer": false,
                          "questions": []
                        }
                      ],
                      "parent": {
                        "answerId": "GICRA1"
                      }
                    },
                    {
                      "questionId": "GICI",
                      "questionText": "City:",
                      "isRequired": false,
                      "isReadOnly": false,
                      "uiControlType": "text",
                      "answers": [
                        {
                          "answerId": "GICI1",
                          "answerText": "",
                          "isChosenAnswer": false,
                          "questions": []
                        }
                      ],
                      "parent": {
                        "answerId": "GICRA1"
                      }
                    }
                  ]
                },
                {
                  "answerId": "GICRA2",
                  "answerText": "No",
                  "isChosenAnswer": false,
                  "questions": []
                }
              ]
            }
          ]
        }
      ]
    };

    this.form = this.formBuilder.group({});
    this.buildForm(this.formData.sections);
  }

  buildForm(sections: any[]): void {
    for (const section of sections) {
      for (const question of section.questions) {
        let formControl = null;
        if (question.uiControlType === 'date') {
          formControl = new FormControl(question.answers[0]?.answerText || '', question.isRequired ? Validators.required : null);
        } else if (question.uiControlType === 'text') {
          formControl = new FormControl(question.answers[0]?.answerText || '', question.isRequired ? Validators.required : null);
        } else if (question.uiControlType === 'radio') {
          for (const answer of question.answers) {
            const nestedQuestions = answer.questions;
            for (const nestedQuestion of nestedQuestions) {
              formControl = new FormControl(nestedQuestion.answers[0]?.answerText || '', nestedQuestion.isRequired ? Validators.required : null);
              this.form.addControl(nestedQuestion.questionId, formControl);
            }
          }
        }

        if (formControl) {
          this.form.addControl(question.questionId, formControl);
        }
      }
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
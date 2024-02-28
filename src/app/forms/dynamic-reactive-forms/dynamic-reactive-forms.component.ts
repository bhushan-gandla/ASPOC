import { Component, Input, OnInit } from '@angular/core';
import { QuestionControlService } from './question-control.service';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from './question-base';

@Component({
  standalone: true,
  selector: 'app-dynamic-reactive-forms',
  templateUrl: './dynamic-reactive-forms.component.html',
  styleUrls: ['./dynamic-reactive-forms.component.scss'],
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule]
})
export class DynamicReactiveFormsComponent implements OnInit{
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}

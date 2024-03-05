import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTemplateFormsComponent } from './dynamic-template-forms.component';

describe('DynamicTemplateFormsComponent', () => {
  let component: DynamicTemplateFormsComponent;
  let fixture: ComponentFixture<DynamicTemplateFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTemplateFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTemplateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

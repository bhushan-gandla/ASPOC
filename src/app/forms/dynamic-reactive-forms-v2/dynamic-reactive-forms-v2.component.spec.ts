import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReactiveFormsV2Component } from './dynamic-reactive-forms-v2.component';

describe('DynamicReactiveFormsV2Component', () => {
  let component: DynamicReactiveFormsV2Component;
  let fixture: ComponentFixture<DynamicReactiveFormsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicReactiveFormsV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicReactiveFormsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

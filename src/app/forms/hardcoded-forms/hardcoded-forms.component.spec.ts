import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcodedFormsComponent } from './hardcoded-forms.component';

describe('HardcodedFormsComponent', () => {
  let component: HardcodedFormsComponent;
  let fixture: ComponentFixture<HardcodedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardcodedFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardcodedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderCreationComponent } from './single-order-creation.component';

describe('SingleOrderCreationComponent', () => {
  let component: SingleOrderCreationComponent;
  let fixture: ComponentFixture<SingleOrderCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOrderCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleOrderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

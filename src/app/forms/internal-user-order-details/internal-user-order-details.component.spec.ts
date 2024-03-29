import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalUserOrderDetailsComponent } from './internal-user-order-details.component';

describe('InternalUserOrderDetailsComponent', () => {
  let component: InternalUserOrderDetailsComponent;
  let fixture: ComponentFixture<InternalUserOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalUserOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalUserOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

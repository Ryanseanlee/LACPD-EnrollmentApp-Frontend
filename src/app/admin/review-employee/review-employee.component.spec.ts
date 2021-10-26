import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEmployeeComponent } from './review-employee.component';

describe('ReviewEmployeeComponent', () => {
  let component: ReviewEmployeeComponent;
  let fixture: ComponentFixture<ReviewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

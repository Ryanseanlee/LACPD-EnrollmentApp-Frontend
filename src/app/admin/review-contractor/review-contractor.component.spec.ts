import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewContractorComponent } from './review-contractor.component';

describe('ReviewContractorComponent', () => {
  let component: ReviewContractorComponent;
  let fixture: ComponentFixture<ReviewContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewContractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

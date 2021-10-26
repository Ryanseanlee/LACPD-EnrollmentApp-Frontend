import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproversComponent } from './approvers.component';

describe('ApproversComponent', () => {
  let component: ApproversComponent;
  let fixture: ComponentFixture<ApproversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

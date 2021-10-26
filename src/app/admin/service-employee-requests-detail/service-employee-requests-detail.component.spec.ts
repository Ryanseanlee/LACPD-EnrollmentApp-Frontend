import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEmployeeRequestsDetailComponent } from './service-employee-requests-detail.component';

describe('ServiceEmployeeRequestsDetailComponent', () => {
  let component: ServiceEmployeeRequestsDetailComponent;
  let fixture: ComponentFixture<ServiceEmployeeRequestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEmployeeRequestsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEmployeeRequestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

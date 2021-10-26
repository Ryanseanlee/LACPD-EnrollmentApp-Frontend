import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerInformationComponent } from './manager-information.component';

describe('ManagerInformationComponent', () => {
  let component: ManagerInformationComponent;
  let fixture: ComponentFixture<ManagerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

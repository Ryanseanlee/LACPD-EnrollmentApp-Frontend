import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetAccessComponent } from './internet-access.component';

describe('InternetAccessComponent', () => {
  let component: InternetAccessComponent;
  let fixture: ComponentFixture<InternetAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

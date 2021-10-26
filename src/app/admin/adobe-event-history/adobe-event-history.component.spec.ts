import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdobeEventHistoryComponent } from './adobe-event-history.component';

describe('AdobeEventHistoryComponent', () => {
  let component: AdobeEventHistoryComponent;
  let fixture: ComponentFixture<AdobeEventHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdobeEventHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdobeEventHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

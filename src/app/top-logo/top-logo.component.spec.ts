import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLogoComponent } from './top-logo.component';

describe('TopLogoComponent', () => {
  let component: TopLogoComponent;
  let fixture: ComponentFixture<TopLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeTogglerComponent } from './mode-toggler.component';

describe('ModeTogglerComponent', () => {
  let component: ModeTogglerComponent;
  let fixture: ComponentFixture<ModeTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeTogglerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

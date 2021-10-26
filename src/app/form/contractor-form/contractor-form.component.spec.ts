import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { ContractorFormComponent } from './contractor-form.component';

describe('ContractorFormComponent', () => {
  let component: ContractorFormComponent;
  let fixture: ComponentFixture<ContractorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorFormComponent],
      imports: [AppModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

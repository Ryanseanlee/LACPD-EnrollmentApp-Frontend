import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [AppModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have userType variable', () => {
    expect(component.userType).toBeUndefined();
  });
  it('should have continueForm variabe', () => {
    expect(component.continueForm).toBeUndefined();
  });
  it('should have requestNumber variable', () => {
    expect(component.requestNumber).toBeUndefined();
  });
  it('should have stepCounter variable and should be set to 0', () => {
    expect(component.stepCounter).toBe(0);
  });
  it('should render the homepage as default (step 0)', () => {
    const jumbotronTitle = fixture.debugElement.query(By.css('h1.display-4'))
      .nativeElement;
    expect(jumbotronTitle.innerText).toContain('Office of Public Defender');
  });
  it('should render the user selection when step is 1', () => {
    // Set the counter to 1, render user selection step
    component.stepCounter = 1;
    fixture.detectChanges();

    // Grab an element to test if it rendered
    const testText = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(testText.innerText).toContain('Are you an employee or contractor?');
  });
  it('should render the form type selection, whether new or continue form, when stepCounter is 2', () => {
    // Set the stepcounter to two
    component.stepCounter = 2;
    fixture.detectChanges();

    // grab element to check that it rendered
    const testText = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(testText.innerText).toContain(
      'Would you like to continue a form or start a new one?'
    );
  });
  // it('should render the request number prompt if the stepCounter is 3', () => {
  //   component.stepCounter = 3;
  //   fixture.detectChanges();

  //   const testText = fixture.debugElement.query(By.css('h3')).nativeElement;
  //   expect(testText.innerText).toContain('Enter Request Number');
  // });
  it('should increase step number when nextStep() is invoked', () => {
    component.stepCounter = 0;
    component.nextStep();
    expect(component.stepCounter).toBe(1);
  });
  it('should decrease step number when previousStep() is invoked', () => {
    component.stepCounter = 1;
    component.previousStep();
    expect(component.stepCounter).toBe(0);
  });
  it('should call nextStep() when start form button is clicked', () => {
    // spy on function
    spyOn(component, 'nextStep');

    // grab button
    const startFormBtn = fixture.debugElement.query(
      By.css('button#startFormBtn')
    ).nativeElement;
    startFormBtn.click();

    // check that it was called
    expect(component.nextStep).toHaveBeenCalled();
  });
  it('should call previousStep() when go back button is pressed', () => {
    // go to step one (where go back button will be)
    component.stepCounter = 1;
    fixture.detectChanges();

    // spy on function
    spyOn(component, 'previousStep');

    // get the button and simulate click
    const goBackBtn = fixture.debugElement.query(By.css('button.go-back-btn'))
      .nativeElement;
    goBackBtn.click();

    // make sure it was called
    expect(component.previousStep).toHaveBeenCalled();
  });
  it('should have a contractor and employee option', () => {
    // go to step one
    component.stepCounter = 1;
    fixture.detectChanges();

    // grab both buttons
    const employeeBtn = fixture.debugElement.query(By.css('button#employeeBtn'))
      .nativeElement;
    const contractorBtn = fixture.debugElement.query(
      By.css('button#contractorBtn')
    ).nativeElement;

    // test that they exist
    expect(employeeBtn.innerText).toContain('Employee');
    expect(contractorBtn.innerText).toContain('Contractor');
  });
  it('should change userType to employee', () => {
    component.selectEmployee();
    expect(component.userType).toBe('employee');
  });
  it('should change userType to contactor', () => {
    component.selectContractor();
    expect(component.userType).toBe('contractor');
  });
  // employee button
  it('should call selectEmployee() and nextStep() on click', () => {
    // set step to 1
    component.stepCounter = 1;
    fixture.detectChanges();

    // spy on selectEmployee() and nextStep()
    spyOn(component, 'selectEmployee');
    spyOn(component, 'nextStep');

    // grab element and simulate click
    const employeeBtn = fixture.debugElement.query(By.css('button#employeeBtn'))
      .nativeElement;
    employeeBtn.click();

    // check that they were called
    expect(component.selectEmployee).toHaveBeenCalled();
    expect(component.nextStep).toHaveBeenCalled();
  });
  // contractor button
  it('should call selectContractor() and nextStep() on click', () => {
    // set step to 1
    component.stepCounter = 1;
    fixture.detectChanges();

    // spy on selectEmployee() and nextStep()
    spyOn(component, 'selectContractor');
    spyOn(component, 'nextStep');

    // grab element and simulate click
    const contractorBtn = fixture.debugElement.query(
      By.css('button#contractorBtn')
    ).nativeElement;
    contractorBtn.click();

    // check that they were called
    expect(component.selectContractor).toHaveBeenCalled();
    expect(component.nextStep).toHaveBeenCalled();
  });
  it('should set continueForm to true', () => {
    component.selectContinueForm();
    expect(component.continueForm).toBeTrue();
  });
  it('should set continueForm to false', () => {
    component.selectNewForm();
    expect(component.continueForm).toBeFalse();
  });
  it('should have new from and continue form buttons', () => {
    // set to step 2
    component.stepCounter = 2;
    fixture.detectChanges();

    // grab elements
    const newFormBtn = fixture.debugElement.query(By.css('button#newFormBtn'))
      .nativeElement;
    const continueFormBtn = fixture.debugElement.query(
      By.css('button#continueFormBtn')
    ).nativeElement;

    // check their innerText
    expect(newFormBtn.innerText).toContain('New form');
    expect(continueFormBtn.innerText).toContain('Continue form');
  });
  // continue form btn
  it('should call selectContinueForm() and nextStep() on click', () => {
    // set step 2
    component.stepCounter = 2;
    fixture.detectChanges();

    // spy on selectContinueForm() and nextStep()
    spyOn(component, 'selectContinueForm');
    spyOn(component, 'nextStep');

    // grab continue form btn
    const continueFormBtn = fixture.debugElement.query(
      By.css('button#continueFormBtn')
    ).nativeElement;
    continueFormBtn.click();

    // test that the function were called
    expect(component.selectContinueForm).toHaveBeenCalled();
    expect(component.nextStep).toHaveBeenCalled();
  });
  // new form button
  it('should call selectNewForm() and nextStep()', () => {
    // set step 2
    component.stepCounter = 2;
    fixture.detectChanges();

    // spy on selectNewForm() and nextStep()
    spyOn(component, 'selectNewForm');
    spyOn(component, 'nextStep');

    // grab continue form btn
    const newFormBtn = fixture.debugElement.query(By.css('button#newFormBtn'))
      .nativeElement;
    newFormBtn.click();

    // test that the function were called
    expect(component.selectNewForm).toHaveBeenCalled();
    expect(component.nextStep).toHaveBeenCalled();
  });
  it('should have an input where request number will be inputted', () => {
    // switch to step 3
    component.stepCounter = 3;
    fixture.detectChanges();

    // grab the input
    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;

    // test that it is there
    expect(inputElement).not.toBeNull();
  });
  // request number input
  it('should bind to requestNumber variable', () => {
    // switch to step 3
    component.stepCounter = 3;
    fixture.detectChanges();

    // grab elem
    const inputElem = fixture.debugElement.query(
      By.css('input#requestNumberInput')
    );
    //update value and dispatch event so angular can notice change
    inputElem.nativeElement.value = '12345';
    inputElem.nativeNode.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // test
    expect(component.requestNumber).toBe(12345);
  });
  it('should call retrieveForm() when pressed', () => {
    // go to step 3
    component.stepCounter = 3;
    fixture.detectChanges();

    // grab button
    const retrieveFormBtn = fixture.debugElement.query(
      By.css('button#retrieveFormBtn')
    );

    // spy on retrieveForm
    spyOn(component, 'retrieveForm');

    // click button
    retrieveFormBtn.nativeElement.click();
    fixture.detectChanges();

    // make sure it was called
    expect(component.retrieveForm).toHaveBeenCalled();
  });
});

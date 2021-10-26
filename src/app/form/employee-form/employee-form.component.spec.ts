/**
 * NOTE:
 * If creating unit tests for this component make sure to call
 * fixture.detectChanges() FIRST BEFORE ANYTHING.
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { EmployeeFormComponent } from './employee-form.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';

fdescribe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let formDataService: FormDataService;

  beforeEach(async () => {
    let formDataServiceStub = {
      formData: undefined,
    };
    await TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent,
        AdditionalInformationComponent,
        SubmitPageComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatStepperModule,
        BrowserAnimationsModule,
        AppModule,
      ],
      providers: [
        ApiHttpService,
        { provide: FormDataService, useValue: formDataServiceStub },
      ],
    }).compileComponents();
    formDataService = TestBed.inject(FormDataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    /**
     * commented this line because the first call to fixture.detectChanges() will call
     * the components ngOnInit. In one of the tests I needed to change the service(formDataService) and basically recall
     * ngOnInit myself. So make sure to call fixture.detectChanges() first in your unit tests.
     */
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have submitResponse variable', () => {
    expect(component.submitResponse).toBeFalsy();
  });
  it('should render submission page(ng-template) if submitResponse and hasSubmitted is set', () => {
    fixture.detectChanges();
    component.submitResponse = {
      // This is a sample response
      sampleUUID: 1234,
      anotherObject: 'other object',
    };
    component.hasSubmitted = true;
    fixture.detectChanges();
    // search that title is available
    const pageTitleElement = fixture.debugElement.query(
      By.css('h4.alert-heading')
    ).nativeElement;

    // Has h1 tag with class page-title with Submit Page as innerText
    expect(pageTitleElement.innerText).toContain('Thanks! Submission Received');
  });
  it('should not render hasSubmitted is false', () => {
    // hasSubmitted is false by default
    fixture.detectChanges();
    // search that the form exists
    const formElement = fixture.debugElement.query(By.css('form#regForm'))
      .nativeElement;

    expect(formElement).toBeDefined();
  });
  it('should have an alert card.', () => {
    fixture.detectChanges();
    component.hasSubmitted = true;
    component.submitResponse = {
      requestNumber: 412341,
    };
    fixture.detectChanges();
    const requestNum = fixture.debugElement.query(By.css('span#request-number'))
      .nativeElement;
    const alertBox = fixture.debugElement.query(By.css('h4.alert-heading'))
      .nativeElement;
    expect(alertBox.innerText).toContain('Thanks! Submission Received');
    expect(requestNum.innerText).toContain(412341); // make sure requestNumber get rendered
  });
  it('should sync data up with form group (personal information)', () => {
    fixture.detectChanges();
    // grab all the components from step 1
    const firstNameIn = fixture.debugElement.query(
      By.css('input#firstNameInput')
    );

    const middleInitialIn = fixture.debugElement.query(
      By.css('input#middleInitialInput')
    );

    const lastNameIn = fixture.debugElement.query(
      By.css('input#lastNameInput')
    );
    const emailAddressIn = fixture.debugElement.query(
      By.css('input#emailAddressInput')
    );

    const phoneNumberIn = fixture.debugElement.query(
      By.css('input#phoneNumberInput')
    );

    // change the values
    firstNameIn.nativeElement.value = 'John';
    middleInitialIn.nativeNode.value = 'A';
    lastNameIn.nativeNode.value = 'Doe';
    emailAddressIn.nativeNode.value = 'email@email.com';
    phoneNumberIn.nativeNode.value = '3234445555';

    // dispatch events (this tells angular to update formgroup, i think)
    firstNameIn.nativeNode.dispatchEvent(new Event('input'));
    middleInitialIn.nativeNode.dispatchEvent(new Event('input'));
    lastNameIn.nativeNode.dispatchEvent(new Event('input'));
    emailAddressIn.nativeNode.dispatchEvent(new Event('input'));
    phoneNumberIn.nativeElement.dispatchEvent(new Event('input'));
    // update view?
    fixture.detectChanges();

    // make sure it reflects on the formgroup
    expect(component.form.value.personalInformation.firstName).toEqual('John');
    expect(component.form.value.personalInformation.middleInitial).toEqual('A');
    expect(component.form.value.personalInformation.lastName).toEqual('Doe');
    expect(component.form.value.personalInformation.emailAddress).toEqual(
      'email@email.com'
    );
    expect(component.form.value.personalInformation.phoneNumber).toEqual(
      '3234445555'
    );
  });
  it('should sync up input values with formgroup (address)', () => {
    fixture.detectChanges();
    // grab all the components from step 2 (address)
    const addressIn = fixture.debugElement.query(By.css('input#addressInput'));
    const cityIn = fixture.debugElement.query(By.css('input#cityInput'));
    const stateIn = fixture.debugElement.query(By.css('input#stateInput'));
    const zipCodeIn = fixture.debugElement.query(By.css('input#zipCodeInput'));

    // change values
    addressIn.nativeElement.value = '123 street';
    cityIn.nativeElement.value = 'city';
    stateIn.nativeElement.value = 'CA';
    zipCodeIn.nativeElement.value = '12345';

    // dispatch events for angular to update
    addressIn.nativeNode.dispatchEvent(new Event('input'));
    cityIn.nativeNode.dispatchEvent(new Event('input'));
    stateIn.nativeNode.dispatchEvent(new Event('input'));
    zipCodeIn.nativeNode.dispatchEvent(new Event('input'));

    // update view
    fixture.detectChanges();
    console.log(component.form.value.information);
    expect(component.form.value.addressInformation.address).toEqual(
      '123 street'
    );
    expect(component.form.value.addressInformation.city).toEqual('city');
    expect(component.form.value.addressInformation.state).toEqual('CA');
    expect(component.form.value.addressInformation.zipCode).toEqual('12345');
  });
  it('should sync data up with formgroup (employee information)', () => {
    fixture.detectChanges();
    // grab all elements
    const employeeNumberIn = fixture.debugElement.query(
      By.css('input#employeeNumberInput')
    );
    const hostedIdIn = fixture.debugElement.query(
      By.css('input#hostedIdInput')
    );

    // change values
    employeeNumberIn.nativeElement.value = '12345';
    hostedIdIn.nativeElement.value = '123';

    // dispatch events
    employeeNumberIn.nativeNode.dispatchEvent(new Event('input'));
    hostedIdIn.nativeNode.dispatchEvent(new Event('input'));

    // update and test
    fixture.detectChanges();
    expect(component.form.value.employeeInformation.employeeNumber).toEqual(
      '12345'
    );
    expect(component.form.value.employeeInformation.hostedId).toEqual('123');
  });
  /**
   * When the user selects to retrieve a form in the homepage component,
   * The retrieved form gets set to a service. If there is a form set in the
   * FormDataService when EmployeeFromComponent is rendered it will fill out the
   * form with the data.
   * TODO: Finish test, test all fields
   */
  it('should render retrieved form if formDataService has a form', () => {
    // Setting a form to service
    formDataService.formData = {
      requestNumber: 392735,
      createDate: '02/11/2021 19:43:36',
      submitDate: null,
      requestStatus: null,
      registrationType: null,
      requestType: null,
      lastName: 'Doe',
      firstName: 'John',
      middleInitial: 'A',
      employeeNumber: 1234,
      hostedId: 12345,
      departmentName: null,
      departmentNumber: null,
      companyName: null,
      companyEmailAddress: null,
      departmentEmailAddress: null,
      countyEmailAddress: null,
      employeeEmailAddress: 'testemail@email.com',
      businessStreetAddress: '123 Street',
      businessCity: 'A City',
      businessState: 'CA',
      businessZip: '12345',
      businessPhoneNumber: '3235555555',
      workMailingAddress: null,
      companyStreetAddress: null,
      companyCity: null,
      companyState: null,
      companyZip: null,
      companyPhoneNumber: null,
      countyPhoneNumber: null,
      workPhoneNumber: null,
      contractWorkOrderNumber: null,
      contractExpirationDate: null,
      customerSignature: null,
      customerSignatureDate: null,
      ibmLogOnId: null,
      majorGroupCode: null,
      lsoGroupCode: null,
      securityAuthorization: null,
      tsoAccess: false,
      tsoGroupCode: null,
      binNumber: null,
      subGroup1: null,
      subGroup2: null,
      subGroup3: null,
      onlineAccess: false,
      systemApplication: null,
      groupName: null,
      oldGroup: null,
      apsAo: null,
      dmvSystemCode: null,
      jaiSystemLocation: null,
      unixRequestType: null,
      unixLogOnId: null,
      unixApplication: null,
      unixAccessGroup: null,
      unixAccountNumber: null,
      billingAccountNumber: null,
      accessType: null,
      internetApplication: false,
      exchangeEmail: false,
      emailEncryption: false,
      laCountyGovAccess: false,
      tokenlessAuthentication: false,
      lacMobileWifiAccess: false,
      cherwellSms: false,
      windowsRightsMgmt: false,
      gmailAccess: false,
      yahooMailAccess: false,
      otherEmailDomain: null,
      businessJustification: null,
      defaultCountyWidePolicy: false,
      departmentPolicyRule0: false,
      departmentPolicyRule1: false,
      departmentPolicyRule2: false,
      departmentPolicyRule3: false,
      departmentPolicyRule4: false,
      socialNetworkingFacebook: false,
      socialNetworkingTwitter: false,
      socialNetworkingLinkedIn: false,
      complete: false,
    };

    fixture.detectChanges();

    // what is in the form group
    const personalInformationValues = component.form.value.personalInformation;
    const addressInformationValues = component.form.value.addressInformation;
    const employeeInformationValues = component.form.value.employeeInformation;

    expect(personalInformationValues['firstName']).toEqual('John');
    expect(personalInformationValues['middleInitial']).toEqual('A');
    expect(personalInformationValues['lastName']).toEqual('Doe');
    expect(personalInformationValues['emailAddress']).toEqual(
      'testemail@email.com'
    );
    expect(personalInformationValues['phoneNumber']).toEqual('3235555555');

    expect(addressInformationValues['address']).toEqual('123 Street');
    expect(addressInformationValues['city']).toEqual('A City');
    expect(addressInformationValues['state']).toEqual('CA');
    expect(addressInformationValues['zipCode']).toEqual('12345');

    expect(employeeInformationValues['employeeNumber']).toEqual(1234);
    expect(employeeInformationValues['hostedId']).toEqual(12345);
  });
  it('should call save() when clicked (personal info save button)', () => {
    fixture.detectChanges();
    // Grab the button
    const saveBtn = fixture.debugElement.query(
      By.css('button#personal-info-save-btn')
    ).nativeElement;

    // spy on the save() function
    spyOn(component, 'save');

    // simulate a click
    saveBtn.click();
    fixture.detectChanges();

    // make sure it was called
    expect(component.save).toHaveBeenCalled();
  });

  it('should call save() when clickekd (address info save button)', () => {
    fixture.detectChanges();
    // Grab the button
    const saveBtn = fixture.debugElement.query(
      By.css('button#address-info-save-btn')
    ).nativeElement;

    // spy on the save() function
    spyOn(component, 'save');

    // simulate a click
    saveBtn.click();
    fixture.detectChanges();

    // make sure it was called
    expect(component.save).toHaveBeenCalled();
  });
  it('should call save() when clicked (employee info save button)', () => {
    fixture.detectChanges();
    // Grab the button
    const saveBtn = fixture.debugElement.query(
      By.css('button#employee-info-save-btn')
    ).nativeElement;

    // spy on the save() function
    spyOn(component, 'save');

    // simulate a click
    saveBtn.click();
    fixture.detectChanges();

    // make sure it was called
    expect(component.save).toHaveBeenCalled();
  });
  it('should call save when save button is clicke (access information step)', () => {
    fixture.detectChanges();
    // Get ref to access info button
    const saveBtn = fixture.debugElement.query(
      By.css('button#access-info-save-btn')
    ).nativeElement;

    // spy on save function
    spyOn(component, 'save');

    saveBtn.click();
    fixture.detectChanges();

    expect(component.save).toHaveBeenCalled();
  });
  it('should match input values to formgroup (IBM data center)', () => {
    // Create formgroup

    fixture.detectChanges();

    // Have to click elements to render forms
    component.renderIBMForm = true;
    component.renderUnixEnvAccess = true;
    component.renderSecurIdAccess = true;
    fixture.detectChanges();

    // Grab input elements
    const logonIn = fixture.debugElement.query(By.css('input#ibmLogonIdInput'));
    console.log(logonIn);
    const majorGroupCodeInput = fixture.debugElement.query(
      By.css('input#ibmMajorGroupCodeInput')
    );
    const lsoGroupCodeInput = fixture.debugElement.query(
      By.css('input#ibmLsoGroupCodeInput')
    );
    const securityAuthIn = fixture.debugElement.query(
      By.css('input#ibmSecurityAuthInput')
    );

    // Change input values
    logonIn.nativeElement.value = 'samplelogon';
    majorGroupCodeInput.nativeElement.value = 'majorcode';
    lsoGroupCodeInput.nativeElement.value = 'groupcode';
    securityAuthIn.nativeElement.value = 'security';
    fixture.detectChanges();

    // Dispatch events
    logonIn.nativeNode.dispatchEvent(new Event('input'));
    majorGroupCodeInput.nativeElement.dispatchEvent(new Event('input'));
    lsoGroupCodeInput.nativeElement.dispatchEvent(new Event('input'));
    securityAuthIn.nativeNode.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    console.log(component.form);
    // check that the form groups are updated
    expect(component.form.value.accessInformation.ibmLogonId).toEqual(
      'samplelogon'
    );
    expect(component.form.value.accessInformation.majorGroupCode).toEqual(
      'majorcode'
    );
    expect(component.form.value.accessInformation.lsoGroupCode).toEqual(
      'groupcode'
    );
    expect(
      component.form.value.accessInformation.securityAuthorization
    ).toEqual('security');
  });
  it('should match input values to formgroup (Unix Environment Access)', () => {
    // Have to click elements to render forms
    component.renderIBMForm = true;
    component.renderUnixEnvAccess = true;
    component.renderSecurIdAccess = true;
    fixture.detectChanges();

    // grab elements
    const logonIdIn = fixture.debugElement.query(
      By.css('input#unixLogonIdInput')
    );
    const applicationIn = fixture.debugElement.query(
      By.css('input#applicationInput')
    );
    const accessGroupIn = fixture.debugElement.query(
      By.css('input#accessGroupInput')
    );
    const accountNumIn = fixture.debugElement.query(
      By.css('input#accountNumberInput')
    );

    // update values
    logonIdIn.nativeElement.value = 'logon';
    applicationIn.nativeElement.value = 'applicationInput';
    accessGroupIn.nativeElement.value = 'accessgroup';
    accountNumIn.nativeElement.value = 'accountnum';
    fixture.detectChanges();

    // dispatch events
    logonIdIn.nativeElement.dispatchEvent(new Event('input'));
    applicationIn.nativeElement.dispatchEvent(new Event('input'));
    accessGroupIn.nativeElement.dispatchEvent(new Event('input'));
    accountNumIn.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // check if they match
    expect(component.form.value.accessInformation.unixLogonId).toEqual('logon');
    expect(component.form.value.accessInformation.application).toEqual(
      'applicationInput'
    );
    expect(component.form.value.accessInformation.accessGroup).toEqual(
      'accessgroup'
    );
    expect(component.form.value.accessInformation.accountNumber).toEqual(
      'accountnum'
    );
  });
  it('should match input values to formgroup (SecurID Access)', () => {
    // Have to click elements to render forms
    component.renderIBMForm = true;
    component.renderUnixEnvAccess = true;
    component.renderSecurIdAccess = true;
    fixture.detectChanges();

    // grab elements
    const billingAccIn = fixture.debugElement.query(
      By.css('input#billingAccountInput')
    );
    const accessTypeSelect = fixture.debugElement.query(
      By.css('select#accessTypeSelect')
    );

    // update values
    billingAccIn.nativeElement.value = '1234';
    accessTypeSelect.nativeElement.value =
      accessTypeSelect.nativeElement.options[0].value;
    fixture.detectChanges();

    // dispatch events
    billingAccIn.nativeElement.dispatchEvent(new Event('input'));
    accessTypeSelect.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // check if they match
    expect(component.form.value.accessInformation.billingAccountNumber).toEqual(
      '1234'
    );
    expect(component.form.value.accessInformation.accessType).toEqual(
      'SecurID VPN'
    );
  });
  it('should call toggleFormRender when IBM Access Form Button is clicked (Access Info step)', () => {
    // Need to call fixture.detectChanges()
    fixture.detectChanges();

    // Grab ref to button
    const ibmAccessBtn = fixture.debugElement.query(By.css('#ibm-access-btn'))
      .nativeElement;

    // spy on function
    spyOn(component, 'toggleFormRender');

    // simulate a click
    ibmAccessBtn.click();

    // check that function was called
    expect(component.toggleFormRender).toHaveBeenCalled();
  });
  it('should call toggleFormRender when IBM Access Form Button is clicked (Access Info step)', () => {
    // Need to call fixture.detectChanges()
    fixture.detectChanges();

    // Grab ref to button
    const ibmAccessBtn = fixture.debugElement.query(By.css('#unix-access-btn'))
      .nativeElement;

    // spy on function
    spyOn(component, 'toggleFormRender');

    // simulate a click
    ibmAccessBtn.click();

    // check that function was called
    expect(component.toggleFormRender).toHaveBeenCalled();
  });
  it('should call toggleFormRender when IBM Access Form Button is clicked (Access Info step)', () => {
    // Need to call fixture.detectChanges()
    fixture.detectChanges();

    // Grab ref to button
    const ibmAccessBtn = fixture.debugElement.query(
      By.css('#securid-access-btn')
    ).nativeElement;

    // spy on function
    spyOn(component, 'toggleFormRender');

    // simulate a click
    ibmAccessBtn.click();

    // check that function was called
    expect(component.toggleFormRender).toHaveBeenCalled();
  });
});

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '400ms',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '400ms',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class EmployeeFormComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  // This is used to hide the employee form after submission, will
  // show the loading page instead
  isLoading = false;
  // If form is saved or continued this will be populated in order to show
  requestNumber: number;
  form: FormGroup;
  submitResponse: object; // Will hold the response if submission is successful
  hasSubmitted: boolean;
  currentIndex: number;
  errorStateMatcher = new InstantErrorStateMatcher();

  // Render booleans for the Access Information Step
  renderIBMForm: boolean;
  renderUnixEnvAccess: boolean;
  renderSecurIdAccess: boolean;

  constructor(
    private formDataService: FormDataService,
    private apiHttpService: ApiHttpService
  ) {}

  ngOnInit(): void {
    // Setting inital step, 0
    this.currentIndex = 0;
    /**
     * If there is a form in the form data service, then it most likely
     * means that the user is coming from the homepage. Meaning that they
     * are continuing a form.
     */
    if (this.formDataService.formData !== undefined) {
      // Set request number
      this.requestNumber = this.formDataService.formData.requestNumber;
      // And grab the prefilled formgroup
      this.form = this.createContinuedFormGroup();
    } else {
      // Starting a new form
      this.form = this.createDefaultFormGroup();
      // To show the form instead of the submit page
      this.hasSubmitted = false;
    }
  }
  /**
   * Takes care of creating a form group.
   * @return The form group that is used in the employee form.
   */
  createDefaultFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      personalInformation: new FormGroup({
        lastName: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        middleInitial: new FormControl(null, Validators.pattern('[a-z A-Z]*')),
        emailAddress: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        phoneNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
        employeeNumber: new FormControl(null),
      }),
      addressInformation: new FormGroup({
        address: new FormControl(null, Validators.required),
        city: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        state: new FormControl(null, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        zipCode: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern('[0-9]*'),
        ]),
      }),
      internetAccess: new FormGroup({
        applyDefaultCountyWidePolicy: new FormControl(false),
        departmentPolicyRule0: new FormControl(false),
        departmentPolicyRule1: new FormControl(false),
        departmentPolicyRule2: new FormControl(false),
        departmentPolicyRule3: new FormControl(false),
        departmentPolicyRule4: new FormControl(false),
        socialNetworkingFacebook: new FormControl(false),
        socialNetworkingTwitter: new FormControl(false),
        socialNetworkingLinkedIn: new FormControl(false),
      }),
      accessInformation: new FormGroup({
        // IBM Data Center Access
        ibmLogonId: new FormControl(null, []),
        majorGroupCode: new FormControl(null, [
          Validators.pattern('[0-9]{2}'),
          Validators.minLength(2),
          Validators.maxLength(2),
        ]),
        lsoGroupCode: new FormControl(null, [
          Validators.pattern('[0-9]{2}'),
          Validators.minLength(2),
          Validators.maxLength(2),
        ]),
        securityAuthorization: new FormControl(null),
        // Unix Environment Access
        unixLogonId: new FormControl(null),
        application: new FormControl(null),
        accessGroup: new FormControl(null),
        accountNumber: new FormControl(null),
        // SecurID Remote Access
        billingAccountNumber: new FormControl(null),
        accessType: new FormControl(null),
      }),
      additionalInformation: new FormGroup({
        internetApplication: new FormControl(false),
        exchangeEmail: new FormControl(false),
        emailEncryption: new FormControl(false),
        laCountyGovAccess: new FormControl(false),
        tokenlessAuthentication: new FormControl(false),
        lacMobileWifiAccess: new FormControl(false),
        cherwellSms: new FormControl(false),
        windowsRightsMgmt: new FormControl(false),
      }),
      managerInformation: new FormGroup({
        managerFirstName: new FormControl(null),
        managerLastName: new FormControl(null),
        managerEmail: new FormControl(null),
        managerPhoneNumber: new FormControl(null),
      }),
    });
    return formGroup;
  }

  // TODO: Add manager information
  /**
   * Creates a form group that is prefilled with data from the formDataService. When the user
   * continues a form, the formDataService will hold the existing form.
   * @returns A form group that is prefilled with data from an existing form on the server.
   */
  createContinuedFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      personalInformation: new FormGroup({
        lastName: new FormControl(this.formDataService.formData.lastName, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        firstName: new FormControl(this.formDataService.formData.firstName, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        middleInitial: new FormControl(
          this.formDataService.formData.middleInitial,
          Validators.pattern('[a-z A-Z]*')
        ),
        emailAddress: new FormControl(
          this.formDataService.formData.employeeEmailAddress,
          [Validators.required, Validators.email]
        ),
        phoneNumber: new FormControl(
          this.formDataService.formData.businessPhoneNumber,
          [Validators.required, Validators.pattern('[0-9]{10}')]
        ),
        employeeNumber: new FormControl(
          this.formDataService.formData.employeeNumber,
          [Validators.required]
        ),
      }),
      addressInformation: new FormGroup({
        address: new FormControl(
          this.formDataService.formData.businessStreetAddress,
          Validators.required
        ),
        city: new FormControl(this.formDataService.formData.businessCity, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        state: new FormControl(this.formDataService.formData.businessState, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        zipCode: new FormControl(this.formDataService.formData.businessZip, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern('[0-9]*'),
        ]),
      }),
      internetAccess: new FormGroup({
        applyDefaultCountyWidePolicy: new FormControl(
          this.formDataService.formData.defaultCountyWidePolicy
        ),
        departmentPolicyRule0: new FormControl(
          this.formDataService.formData.departmentPolicyRule0
        ),
        departmentPolicyRule1: new FormControl(
          this.formDataService.formData.departmentPolicyRule1
        ),
        departmentPolicyRule2: new FormControl(
          this.formDataService.formData.departmentPolicyRule2
        ),
        departmentPolicyRule3: new FormControl(
          this.formDataService.formData.departmentPolicyRule3
        ),
        departmentPolicyRule4: new FormControl(
          this.formDataService.formData.departmentPolicyRule4
        ),
        socialNetworkingFacebook: new FormControl(
          this.formDataService.formData.socialNetworkingFacebook
        ),
        socialNetworkingTwitter: new FormControl(
          this.formDataService.formData.socialNetworkingTwitter
        ),
        socialNetworkingLinkedIn: new FormControl(
          this.formDataService.formData.socialNetworkingLinkedIn
        ),
      }),
      accessInformation: new FormGroup({
        // IBM Data Center Access
        renderIBMForm: new FormControl(),
        ibmLogonId: new FormControl(this.formDataService.formData.ibmLogOnId),
        majorGroupCode: new FormControl(
          this.formDataService.formData.majorGroupCode
        ),
        lsoGroupCode: new FormControl(
          this.formDataService.formData.lsoGroupCode
        ),
        securityAuthorization: new FormControl(
          this.formDataService.formData.securityAuthorization
        ),
        // Unix Environment Access
        renderUnixEnvAccess: new FormControl(),
        unixLogonId: new FormControl(this.formDataService.formData.unixLogOnId),
        application: new FormControl(
          this.formDataService.formData.unixApplication
        ),
        accessGroup: new FormControl(
          this.formDataService.formData.unixAccessGroup
        ),
        accountNumber: new FormControl(
          this.formDataService.formData.unixAccountNumber
        ),
        // SecurID Remote Access
        renderSecurIdAccess: new FormControl(),
        billingAccountNumber: new FormControl(
          this.formDataService.formData.billingAccountNumber
        ),
        accessType: new FormControl(null), // Not yet implemented on backend
      }),
      additionalInformation: new FormGroup({
        internetApplication: new FormControl(
          this.formDataService.formData.internetApplication
        ),
        exchangeEmail: new FormControl(
          this.formDataService.formData.exchangeEmail
        ),
        emailEncryption: new FormControl(
          this.formDataService.formData.emailEncryption
        ),
        laCountyGovAccess: new FormControl(
          this.formDataService.formData.laCountyGovAccess
        ),
        tokenlessAuthentication: new FormControl(
          this.formDataService.formData.tokenlessAuthentication
        ),
        lacMobileWifiAccess: new FormControl(
          this.formDataService.formData.lacMobileWifiAccess
        ),
        cherwellSms: new FormControl(this.formDataService.formData.cherwellSms),
        windowsRightsMgmt: new FormControl(
          this.formDataService.formData.windowsRightsMgmt
        ),
      }),
      // TODO: Retrieve these values from formData
      managerInformation: new FormGroup({
        managerFirstName: new FormControl(
          this.formDataService.formData.managerFirstName
        ),
        managerLastName: new FormControl(
          this.formDataService.formData.managerLastName
        ),
        managerEmail: new FormControl(
          this.formDataService.formData.managerEmail
        ),
        managerPhoneNumber: new FormControl(
          this.formDataService.formData.managerPhone
        ),
      }),
    });
    return formGroup;
  }

  /*This functions is passed down to submit step
   *and it will change the index of the stepper*/
  setIndex = (newIndex: number): void => {
    this.myStepper.selectedIndex = newIndex;
  };

  // This function is passed down to submit step
  // Will update variable to rerender and hold response object
  setSubmitResponse = (response: object): void => {
    // Arrow function binds this
    this.hasSubmitted = true;
    this.submitResponse = response;
  };

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  // This function is responsible for saving the form
  save = (): void => {
    console.log('current form data', this.formDataService.formData);
    // A form is already in formData Service
    if (this.formDataService.formData != undefined) {
      console.log('from formData', this.formDataService.formData);
      this.apiHttpService
        .saveForm(
          this.formDataService.formData.requestNumber,
          false,
          this.form.value
        )
        .subscribe((res) => {
          console.log(res);
          // Set the formData to the response
          this.formDataService.formData = res;
        });
    } else {
      // Create a form and set to service
      this.apiHttpService.createForm(this.form.value, true).subscribe((res) => {
        console.log(res);
        this.formDataService.formData = res;

        // Set request number so it can display on page
        this.requestNumber = this.formDataService.formData.requestNumber;
      });
    }
  };

  // A testing function to log the form
  printForm(): void {
    console.log(this.form);
  }

  /**
   * @description This function is used by the buttons in access information step
   *
   * @param formName The form boolean that is going to be toggled.
   * Possible opitons: Ibm Access Infromation('ibm'), Unix Environment Access('unix'), SecurID Remote Access('securid')
   */
  toggleFormRender = (formName: string): void => {
    switch (formName) {
      case 'ibm':
        this.renderIBMForm = !this.renderIBMForm;
        break;
      case 'unix':
        this.renderUnixEnvAccess = !this.renderUnixEnvAccess;
        break;
      case 'securid':
        this.renderSecurIdAccess = !this.renderSecurIdAccess;
        break;
    }
  };
}

// changes the ErrorStateMatcher to include dirty
// removes the error message and red boxes after clicking next
class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

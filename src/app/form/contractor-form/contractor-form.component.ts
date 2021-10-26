import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ModuleWithComponentFactories, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.css'],
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
export class ContractorFormComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  formContractor: FormGroup;
  errorStateMatcher = new InstantErrorStateMatcher();
  hasSubmitted: boolean;

  //Applicaitons Requested Boolean Variables
  internetAccess: boolean;
  emailAccount: boolean;
  emailEncryption: boolean;
  tokenlessAuthentication: boolean;
  lacMobileWifi: boolean;
  cherwellSMS: boolean;
  windowRightsManagement: boolean;

  //Internet Policy Boolean Variables
  applyDefaultCountyWidePolicy: boolean;
  departmentPolicyRule0: boolean;
  departmentPolicyRule1: boolean;
  departmentPolicyRule2: boolean;
  departmentPolicyRule3: boolean;
  departmentPolicyRule4: boolean;
  socialNetworkingFacebook: boolean;
  socialNetworkingTwitter: boolean;
  socialNetworkingLinkedIn: boolean;

  //Additional Access Boolean Variables
  ibmChecked: boolean;
  unixChecked: boolean;
  securidChecked: boolean;

  constructor(
    private formDataService: FormDataService,
    private apiHttpService: ApiHttpService
    ) {}

  ngOnInit(): void {
    this.formContractor = new FormGroup({
      contractorBasicInformation: new FormGroup({
        
        lastName: new FormControl(null,
          [Validators.required, Validators.pattern("[a-z A-Z]*")]
          ),
        firstName: new FormControl(null,
          [Validators.required, Validators.pattern("[a-z A-Z]*")]
          ),
        middleInitial: new FormControl(null,
          Validators.pattern("[a-z A-Z]*")
          ),
        companyName: new FormControl(null,
          Validators.required
          ),
        companyEmailAddress: new FormControl(null,
          [Validators.required, Validators.email]
          ),
        phoneNumber: new FormControl(null,
          [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
          ),
      }),
      contractorAddressInformation: new FormGroup({
        companyStreetAddress: new FormControl(null,
          Validators.required
          ),
        city: new FormControl(null,
          [Validators.required, Validators.pattern("[a-z A-Z]*")]
          ),
        state: new FormControl(null,
          [Validators.required, Validators.pattern("[a-z A-Z]*")]
          ),
        zipCode: new FormControl(null,
          [Validators.required, Validators.minLength(5), Validators.maxLength(7), Validators.pattern("[0-9]*")]
          ),
      }),
      countyBasicInformation: new FormGroup({
        contractWorkOrderNumber: new FormControl(null,
          Validators.required
          ),
        contractExpirationDate: new FormControl(null,
          [Validators.required] //Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]
          ),
        countyEmailAddress: new FormControl(null,
          [Validators.required, Validators.email]
          ),
        phoneNumber: new FormControl(null,
          [Validators.required, Validators.pattern("[0-9]{10}")]
          ),
        departmentName: new FormControl(null,
          Validators.pattern("[a-z A-Z]*")
          ),
        departmentNumber: new FormControl(null,
          Validators.pattern("[0-9]*")
          ),
      }),
      countyAddressInformation: new FormGroup({
        businessStreetAddress: new FormControl(null),
        businessCity: new FormControl(null,
          Validators.pattern("[a-z A-Z]*")
          ),
        businessZipCode: new FormControl(null,
          [Validators.minLength(5), Validators.maxLength(7), Validators.pattern("[0-9]*")]
          ),
      }),
      applicationsRequested: new FormGroup({
        internetAccess: new FormControl(false),
        emailAccount: new FormControl(false),
        emailEncryption: new FormControl(false),
        tokenlessAuthentication: new FormControl(false),
        lacMobileWifi: new FormControl(false),
        cherwellSMS: new FormControl(false),
        windowRightsManagement: new FormControl(false),
      }),
      policyRulesInformation: new FormGroup ({
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
      additionalAccessInformation: new FormGroup ({
        // IBM Data Center Access
        ibmChecked: new FormControl (false),
        ibmLogonId: new FormControl(null),
        majorGroupCode: new FormControl(null),
        lsoGroupCode: new FormControl(null),
        securityAuthorization: new FormControl(null),
        // Unix Environment Access
        unixChecked: new FormControl (false),
        unixTypeRequest: new FormControl (null),
        unixLogonId: new FormControl(null),
        application: new FormControl(null),
        accessGroup: new FormControl(null),
        accountNumber: new FormControl(null),
        // SecurID Remote Access
        securidChecked: new FormControl (false),
        billingAccountNumber: new FormControl(null),
        accessType: new FormControl(null),
      })
    });

    this.hasSubmitted = false;
  }


  /*Changes the boolean variables of Policy Rules when user selects or deselects the buttons*/
  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.formContractor
      .get(['policyRulesInformation', event.source.id])
      .setValue(this[event.source.id]);

    // This is the code for the chiplist
    // if (event.source.checked) {
    //   // Add to chiplist
    //   this.options.add(nameOfOption);
    // } else {
    //   // Remove from chiplist
    //   this.options.delete(nameOfOption);
    // }
  }

  /*Changes the boolean variables of Additional Access when user selects or deselects the buttons*/
  onButtonChange2(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.formContractor
      .get(['additionalAccessInformation', event.source.id])
      .setValue(this[event.source.id]);
  }

  /*Changes the boolean variables of Applications Requested when user selects or deselects the buttons*/
  onButtonChange3(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.formContractor
      .get(['applicationsRequested', event.source.id])
      .setValue(this[event.source.id]);
  }

  move(index:number) {
    this.stepper.selectedIndex = index;
  }

  /*This function will submit the form and it's content
  */
  onClick(): void {
    console.log(JSON.stringify(this.formContractor.value)); // debugging

    this.apiHttpService
      .createForm(this.formContractor.value, false)
      .subscribe((response) => {
        console.log(response);
      });
  }
}

// changes the ErrorStateMatcher to include dirty
// removes the error message and red boxes after clicking next
export class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

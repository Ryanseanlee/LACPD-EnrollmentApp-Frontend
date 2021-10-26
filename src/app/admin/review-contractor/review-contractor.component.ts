import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { ConfirmationPageService } from 'src/app/core/services/confirmation-page.service';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-review-contractor',
  templateUrl: './review-contractor.component.html',
  styleUrls: ['./review-contractor.component.css'],
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
export class ReviewContractorComponent implements OnInit {
  errorStateMatcher = new InstantErrorStateMatcher();
  requestNumber: string;

  //application requested
  defaultCountyWidePolicy: boolean;
  departmentPolicyRule0: boolean;
  departmentPolicyRule1: boolean;
  departmentPolicyRule2: boolean;
  departmentPolicyRule3: boolean;
  departmentPolicyRule4: boolean;
  socialNetworkingFacebook: boolean;
  socialNetworkingTwitter: boolean;
  socialNetworkingLinkedIn: boolean;

  //active-directory
  internetApplication: boolean;
  exchangeEmail: boolean;
  emailEncryption: boolean;
  tokenlessAuthentication: boolean;
  lacMobileWifiAccess: boolean;
  cherwellSms: boolean;
  windowsRightsMgmt: boolean;

  //selections arrays
  divCheifList: Array<any>;
  deptHeadList: Array<any>;
  appCoordList: Array<any>;
  deptInfoList: Array<any>;

  //selected value
  selectedValue: any;

  //for loading after form is submitted
  isLoading = false;

  //approval FormGroup-manager, divisionChief, etc
  adminContractor: FormGroup;

  //Additional Access Boolean Variables
  ibmChecked: boolean;
  unixChecked: boolean;
  securidChecked: boolean;

  constructor(
    private formDataService: FormDataService,
    private adminService: AdminService,
    private apiHttpService: ApiHttpService,
    private route: ActivatedRoute,
    private confirmationPageService: ConfirmationPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //request Number to display in form
    this.requestNumber = this.formDataService.formData.requestNumber;

    //internet-access
    this.defaultCountyWidePolicy = this.formDataService.formData.defaultCountyWidePolicy;
    this.departmentPolicyRule0 = this.formDataService.formData.departmentPolicyRule0;
    this.departmentPolicyRule1 = this.formDataService.formData.departmentPolicyRule1;
    this.departmentPolicyRule2 = this.formDataService.formData.departmentPolicyRule2;
    this.departmentPolicyRule3 = this.formDataService.formData.departmentPolicyRule3;
    this.departmentPolicyRule4 = this.formDataService.formData.departmentPolicyRule4;
    this.socialNetworkingFacebook = this.formDataService.formData.socialNetworkingFacebook;
    this.socialNetworkingTwitter = this.formDataService.formData.socialNetworkingTwitter;
    this.socialNetworkingLinkedIn = this.formDataService.formData.socialNetworkingLinkedIn;

    //active-directory
    this.internetApplication = this.formDataService.formData.internetApplication;
    this.exchangeEmail = this.formDataService.formData.exchangeEmail;
    this.emailEncryption = this.formDataService.formData.emailEncryption;
    this.tokenlessAuthentication = this.formDataService.formData.tokenlessAuthentication;
    this.lacMobileWifiAccess = this.formDataService.formData.lacMobileWifiAccess;
    this.cherwellSms = this.formDataService.formData.cherwellSms;
    this.windowsRightsMgmt = this.formDataService.formData.windowsRightsMgmt;

    //get all approver selections to display
    this.getDivChiefList();
    this.getDeptHead();
    this.getAppCoord();
    this.getDeptInfo();

    this.adminContractor = new FormGroup({
      contractorInformation: new FormGroup({
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
        companyName: new FormControl(
          this.formDataService.formData.companyName,
          Validators.required
        ),
        companyEmailAddress: new FormControl(
          this.formDataService.formData.companyEmailAddress,
          [Validators.required, Validators.email]
        ),
        companyStreetAddress: new FormControl(
          this.formDataService.formData.companyStreetAddress,
          Validators.required
        ),
        city: new FormControl(this.formDataService.formData.companyCity, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        state: new FormControl(this.formDataService.formData.companyState, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        zipCode: new FormControl(this.formDataService.formData.companyZip, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern('[0-9]*'),
        ]),
        phoneNumber: new FormControl(
          this.formDataService.formData.companyPhoneNumber,
          [Validators.required, Validators.pattern('[0-9]{10}')]
        ),
      }),
      countyInformation: new FormGroup({
        contractWorkOrderNumber: new FormControl(
          this.formDataService.formData.contractWorkOrderNumber,
          Validators.required
        ),
        contractExpirationDate: new FormControl(
          this.formDataService.formData.contractExpirationDate,
          [Validators.required] //Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]
        ),
        countyEmailAddress: new FormControl(
          this.formDataService.formData.countyEmailAddress,
          [Validators.required, Validators.email]
        ),
        phoneNumber: new FormControl(
          this.formDataService.formData.businessPhoneNumber,
          [Validators.required, Validators.pattern('[0-9]{10}')]
        ),
        departmentName: new FormControl(
          this.formDataService.formData.departmentName,
          Validators.pattern('[a-z A-Z]*')
        ),
        departmentNumber: new FormControl(
          this.formDataService.formData.departmentNumber,
          Validators.pattern('[0-9]*')
        ),
        businessStreetAddress: new FormControl(
          this.formDataService.formData.businessStreetAddress
        ),
        businessCity: new FormControl(
          this.formDataService.formData.businessCity,
          Validators.pattern('[a-z A-Z]*')
        ),
        businessZipCode: new FormControl(
          this.formDataService.formData.businessZip,
          [
            Validators.minLength(5),
            Validators.maxLength(7),
            Validators.pattern('[0-9]*'),
          ]
        ),
      }),
      policyRulesInformation: new FormGroup({
        defaultCountyWidePolicy: new FormControl(
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
        managerPhone: new FormControl(
          this.formDataService.formData.managerPhone
        ),
        managerTitle: new FormControl(
          this.formDataService.formData.managerTitle
        ),
      }),
      signatures: new FormGroup({
        applicationCoordinatorName: new FormControl(
          this.formDataService.formData.applicationCoordinatorName
        ),
        applicationCoordinatorPhone: new FormControl(
          this.formDataService.formData.applicationCoordinatorPhone
        ),
        applicationCoordinatorEmail: new FormControl(
          this.formDataService.formData.applicationCoordinatorEmail
        ),

        divChiefManagerName: new FormControl(
          this.formDataService.formData.divChiefManagerName
        ),
        divChiefManagerPhone: new FormControl(
          this.formDataService.formData.divChiefManagerPhone
        ),
        divChiefManagerEmail: new FormControl(
          this.formDataService.formData.divChiefManagerEmail
        ),

        deptInfoSecurityOfficerName: new FormControl(
          this.formDataService.formData.deptInfoSecurityOfficerName
        ),
        deptInfoSecurityOfficerPhone: new FormControl(
          this.formDataService.formData.deptInfoSecurityOfficerPhone
        ),
        deptInfoSecurityOfficerEmail: new FormControl(
          this.formDataService.formData.deptInfoSecurityOfficerEmail
        ),
        departmentHeadName: new FormControl(
          this.formDataService.formData.departmentHeadName
        ),
        departmentHeadPhone: new FormControl(
          this.formDataService.formData.departmentHeadPhone
        ),
        departmentHeadEmail: new FormControl(
          this.formDataService.formData.departmentHeadEmail
        ),
      }),
    });
  }

  //set to approval form here for mat-select signatures
  setSelectedValue(type: string, id: number): void {
    if (type == 'divisionChief') {
      if (id == null) {
        this.adminContractor
          .get('signatures.divChiefManagerPhone')
          .patchValue(null);
        this.adminContractor
          .get('signatures.divChiefManagerEmail')
          .patchValue(null);
      } else {
        this.adminService.getDivChief(id).subscribe((res) => {
          this.adminContractor
            .get('signatures.divChiefManagerPhone')
            .patchValue(res.phone);
          this.adminContractor
            .get('signatures.divChiefManagerEmail')
            .patchValue(res.email);
        });
      }
    } else if (type == 'departmentHead') {
      if (id == null) {
        this.adminContractor
          .get('signatures.departmentHeadPhone')
          .patchValue(null);
        this.adminContractor
          .get('signatures.departmentHeadEmail')
          .patchValue(null);
      } else {
        this.adminService.getDeptHead(id).subscribe((res) => {
          this.adminContractor
            .get('signatures.departmentHeadPhone')
            .patchValue(res.phone);
          this.adminContractor
            .get('signatures.departmentHeadEmail')
            .patchValue(res.email);
        });
      }
    } else if (type == 'appCoord') {
      if (id == null) {
        this.adminContractor
          .get('signatures.applicationCoordinatorPhone')
          .patchValue(null);
        this.adminContractor
          .get('signatures.applicationCoordinatorEmail')
          .patchValue(null);
      } else {
        this.adminService.getAppCoord(id).subscribe((res) => {
          this.adminContractor
            .get('signatures.applicationCoordinatorPhone')
            .patchValue(res.phone);
          this.adminContractor
            .get('signatures.applicationCoordinatorEmail')
            .patchValue(res.email);
        });
      }
    } else {
      if (id == null) {
        this.adminContractor
          .get('signatures.deptInfoSecurityOfficerPhone')
          .patchValue(null);
        this.adminContractor
          .get('signatures.deptInfoSecurityOfficerEmail')
          .patchValue(null);
      } else {
        this.adminService.getDeptInfoSec(id).subscribe((res) => {
          this.adminContractor
            .get('signatures.deptInfoSecurityOfficerPhone')
            .patchValue(res.phone);
          this.adminContractor
            .get('signatures.deptInfoSecurityOfficerEmail')
            .patchValue(res.email);
        });
      }
    }
  }

  //get list for all approver types
  getDivChiefList() {
    this.adminService.getAllDivChief().subscribe((res) => {
      this.divCheifList = res;
    });
  }

  getDeptHead() {
    this.adminService.getAllDeptHead().subscribe((res) => {
      this.deptHeadList = res;
    });
  }

  getAppCoord() {
    this.adminService.getAllAppCoord().subscribe((res) => {
      this.appCoordList = res;
    });
  }

  getDeptInfo() {
    this.adminService.getAllDeptInfoSec().subscribe((res) => {
      this.deptInfoList = res;
    });
  }

  //not working yet-set complete to true
  startAdobeProcess = (): void => {
    this.isLoading = true;
    this.adminService
      .submitForm(
        this.formDataService.formData.requestNumber,
        this.adminContractor.value,
        false
      )
      .subscribe({
        next: (response) => {
          this.formDataService.formData = response;
          this.confirmationPageService.requestNumber = response.requestNumber;
          this.confirmationPageService.isAdmin = true;
          this.router.navigate(['/confirmation-page']);
          console.log(response);
        },
      });
  };

  onButtonChange3(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.adminContractor
      .get(['accessInformation', event.source.id])
      .setValue(this[event.source.id]);
  }
  onButtonChange2(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.adminContractor
      .get(['policyRulesInformation', event.source.id])
      .setValue(this[event.source.id]);
  }

  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.adminContractor
      .get(['additionalInformation', event.source.id])
      .setValue(this[event.source.id]);
  }

  //save button-save form
  save = (): void => {
    this.adminService
      .saveForm(
        this.formDataService.formData.requestNumber,
        this.adminContractor.value,
        false
      )
      .subscribe((res) => {
        //debug
        console.log(res);
        this.formDataService.formData = res;
      });
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

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfirmationPageService } from 'src/app/core/services/confirmation-page.service';

@Component({
  selector: 'app-review-employee',
  templateUrl: './review-employee.component.html',
  styleUrls: ['./review-employee.component.css'],
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
export class ReviewEmployeeComponent implements OnInit {
  errorStateMatcher = new InstantErrorStateMatcher();
  requestNumber: string;

    //application requested
  countyWidePolicyA: boolean;
  countyWidePolicyB: boolean;
  allWebmail: boolean;
  streamMedia: boolean;
  justification: boolean;


    //active-directory
  laCountyGovAccess: boolean;
  lacMobileWifiAccess: boolean;
  o365Email: boolean;

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
  approval: FormGroup;
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
    this.countyWidePolicyA = this.formDataService.formData.countyWidePolicyA;
    this.countyWidePolicyB = this.formDataService.formData.countyWidePolicyB;
    this.allWebmail = this.formDataService.formData.allWebmail;
    this.streamMedia = this.formDataService.formData.streamMedia;
    this.justification = this.formDataService.formData.justification;

      //active-directory
    this.laCountyGovAccess = this.formDataService.formData.laCountyGovAccess;
    this.lacMobileWifiAccess = this.formDataService.formData.lacMobileWifiAccess;
    this.o365Email = this.formDataService.formData.o365Email;

    //get all approver selections to display
    this.getDivChiefList();
    this.getDeptHead();
    this.getAppCoord();
    this.getDeptInfo();

    //create the form group
    this.approval = new FormGroup({
      iscomplete: new FormControl(this.formDataService.formData.complete),
      
      personalInformation: new FormGroup({
        employee: new FormControl(this.formDataService.formData.employee, [
          Validators.required
        ]),
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
          this.formDataService.formData.emailAddress,
          [Validators.required, Validators.email]
        ),
        countyDepartmentName: new FormControl(
          this.formDataService.formData.countyDepartmentName, [
          Validators.pattern('[a-z A-Z]*'),
        ]),
        countyDepartmentNumber: new FormControl(this.formDataService.formData.countyDepartmentNumber, [
          Validators.pattern('[0-9]*'),
        ]),
        phoneNumber: new FormControl(
          this.formDataService.formData.phoneNumber,
          [Validators.required, Validators.pattern('[0-9]{10}')]
        ),
        workPhoneNumber: new FormControl(this.formDataService.formData.workPhoneNumber, [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
        employeeNumber: new FormControl(
          this.formDataService.formData.employeeNumber,
          [Validators.required]
        ),
        contractorName: new FormControl(this.formDataService.formData.contractorName, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        workOrderNumberInput: new FormControl(this.formDataService.formData.workOrderNumberInput, [
          Validators.required,
          Validators.pattern('[0-9]*'),
        ]),
        expirationDate: new FormControl(this.formDataService.formData.expirationDate),
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
      policyRulesInformation: new FormGroup({
        countyWidePolicyA: new FormControl(this.formDataService.formData.countyWidePolicyA),
        countyWidePolicyB: new FormControl(this.formDataService.formData.countyWidePolicyB),
        allWebmail: new FormControl(this.formDataService.formData.allWebmail),
        streamMedia: new FormControl(this.formDataService.formData.streamMedia),
        justification: new FormControl(this.formDataService.formData.justification),
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
        // NOTE* HERE Might cause an error.
        unixLogonId: new FormControl(this.formDataService.formData.unixLogonId),
        application: new FormControl(
          this.formDataService.formData.application
        ),
        accessGroup: new FormControl(
          this.formDataService.formData.accessGroup
        ),
        // SecurID Remote Access
        billingAccountNumber: new FormControl(
          this.formDataService.formData.billingAccountNumber
        ),
        // accessType: new FormControl(null), // Not yet implemented on backend
      }),
      additionalInformation: new FormGroup({
        laCountyGovAccess: new FormControl(
          this.formDataService.formData.laCountyGovAccess
        ),

        lacMobileWifiAccess: new FormControl(
          this.formDataService.formData.lacMobileWifiAccess
        ),
        o365Email: new FormControl(this.formDataService.formData.o365Email),
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
        this.approval.get('signatures.divChiefManagerPhone').patchValue(null);
        this.approval.get('signatures.divChiefManagerEmail').patchValue(null);
      } else {
        this.adminService.getDivChief(id).subscribe((res) => {
          this.approval
            .get('signatures.divChiefManagerPhone')
            .patchValue(res.phone);
          this.approval
            .get('signatures.divChiefManagerEmail')
            .patchValue(res.email);
        });
      }
    } else if (type == 'departmentHead') {
      if (id == null) {
        this.approval.get('signatures.departmentHeadPhone').patchValue(null);
        this.approval.get('signatures.departmentHeadEmail').patchValue(null);
      } else {
        this.adminService.getDeptHead(id).subscribe((res) => {
          this.approval
            .get('signatures.departmentHeadPhone')
            .patchValue(res.phone);
          this.approval
            .get('signatures.departmentHeadEmail')
            .patchValue(res.email);
        });
      }
    } else if (type == 'appCoord') {
      if (id == null) {
        this.approval
          .get('signatures.applicationCoordinatorPhone')
          .patchValue(null);
        this.approval
          .get('signatures.applicationCoordinatorEmail')
          .patchValue(null);
      } else {
        this.adminService.getAppCoord(id).subscribe((res) => {
          this.approval
            .get('signatures.applicationCoordinatorPhone')
            .patchValue(res.phone);
          this.approval
            .get('signatures.applicationCoordinatorEmail')
            .patchValue(res.email);
        });
      }
    } else {
      if (id == null) {
        this.approval
          .get('signatures.deptInfoSecurityOfficerPhone')
          .patchValue(null);
        this.approval
          .get('signatures.deptInfoSecurityOfficerEmail')
          .patchValue(null);
      } else {
        this.adminService.getDeptInfoSec(id).subscribe((res) => {
          this.approval
            .get('signatures.deptInfoSecurityOfficerPhone')
            .patchValue(res.phone);
          this.approval
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
        this.approval.value,
        true
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


  onButtonChange2(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.approval
      .get(['policyRulesInformation', event.source.id])
      .setValue(this[event.source.id]);

  }


  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.approval
      .get(['additionalInformation', event.source.id])
      .setValue(this[event.source.id]);
  }

  //save button-save form
  save = (): void => {
    this.adminService
      .saveForm(
        this.formDataService.formData.requestNumber,
        this.approval.value,
        true
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

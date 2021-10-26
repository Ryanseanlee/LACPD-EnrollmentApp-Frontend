import {
  Component,
  OnInit,
  ModuleWithComponentFactories,
  ViewChild,
} from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-service-employee-requests-detail',
  templateUrl: './service-employee-requests-detail.component.html',
  styleUrls: ['./service-employee-requests-detail.component.css'],
})
export class ServiceEmployeeRequestsDetailComponent implements OnInit {
  adminForm: FormGroup;
  requestNumber: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.requestNumber = this.adminService.adminFormData.requestNumber;
    this.adminForm = new FormGroup({
      personalInformation: new FormGroup({
        lastName: new FormControl(this.adminService.adminFormData.lastName, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        firstName: new FormControl(this.adminService.adminFormData.firstName, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        middleInitial: new FormControl(
          this.adminService.adminFormData.middleInitial,
          Validators.pattern('[a-z A-Z]*')
        ),
        emailAddress: new FormControl(
          this.adminService.adminFormData.employeeEmailAddress,
          [Validators.required, Validators.email]
        ),
        phoneNumber: new FormControl(
          this.adminService.adminFormData.businessPhoneNumber,
          [Validators.required, Validators.pattern('[0-9]{10}')]
        ),
        employeeNumber: new FormControl(
          this.adminService.adminFormData.employeeNumber,
          [Validators.required]
        ),
      }),
      addressInformation: new FormGroup({
        address: new FormControl(
          this.adminService.adminFormData.businessStreetAddress,
          Validators.required
        ),
        city: new FormControl(this.adminService.adminFormData.businessCity, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        state: new FormControl(this.adminService.adminFormData.businessState, [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
        ]),
        zipCode: new FormControl(this.adminService.adminFormData.businessZip, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern('[0-9]*'),
        ]),
      }),
      accessInformation: new FormGroup({
        // IBM Data Center Access
        renderIBMForm: new FormControl(),
        ibmLogonId: new FormControl(this.adminService.adminFormData.ibmLogOnId),
        majorGroupCode: new FormControl(
          this.adminService.adminFormData.majorGroupCode
        ),
        lsoGroupCode: new FormControl(
          this.adminService.adminFormData.lsoGroupCode
        ),
        securityAuthorization: new FormControl(
          this.adminService.adminFormData.securityAuthorization
        ),
        // Unix Environment Access
        renderUnixEnvAccess: new FormControl(),
        unixLogonId: new FormControl(
          this.adminService.adminFormData.unixLogOnId
        ),
        application: new FormControl(
          this.adminService.adminFormData.unixApplication
        ),
        accessGroup: new FormControl(
          this.adminService.adminFormData.unixAccessGroup
        ),
        accountNumber: new FormControl(
          this.adminService.adminFormData.unixAccountNumber
        ),
        // SecurID Remote Access
        renderSecurIdAccess: new FormControl(),
        billingAccountNumber: new FormControl(
          this.adminService.adminFormData.billingAccountNumber
        ),
        accessType: new FormControl(null), // Not yet implemented on backend
      }),
      additionalInformation: new FormGroup({
        internetApplication: new FormControl(
          this.adminService.adminFormData.internetApplication
        ),
        exchangeEmail: new FormControl(
          this.adminService.adminFormData.exchangeEmail
        ),
        emailEncryption: new FormControl(
          this.adminService.adminFormData.emailEncryption
        ),
        laCountyGovAccess: new FormControl(
          this.adminService.adminFormData.laCountyGovAccess
        ),
        tokenlessAuthentication: new FormControl(
          this.adminService.adminFormData.tokenlessAuthentication
        ),
        lacMobileWifiAccess: new FormControl(
          this.adminService.adminFormData.lacMobileWifiAccess
        ),
        cherwellSms: new FormControl(
          this.adminService.adminFormData.cherwellSms
        ),
        windowsRightsMgmt: new FormControl(
          this.adminService.adminFormData.windowsRightsMgmt
        ),
      }),
    });
  }
}

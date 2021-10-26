import { Component, OnInit,  ModuleWithComponentFactories, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-service-requests-detail',
  templateUrl: './service-requests-detail.component.html',
  styleUrls: ['./service-requests-detail.component.css']
})
export class ServiceRequestsDetailComponent implements OnInit {
  adminForm: FormGroup;
  requestNumber: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
      this.requestNumber = this.adminService.adminFormData.requestNumber
      this.adminForm = new FormGroup({
          contractorInformation: new FormGroup({
            lastName: new FormControl(this.adminService.adminFormData.lastName,
              ),
              firstName: new FormControl(this.adminService.adminFormData.firstName,
                ),
              middleInitial: new FormControl(this.adminService.adminFormData.middleInitial,
                ),
              companyName: new FormControl(this.adminService.adminFormData.companyName,
                ),
              companyEmailAddress: new FormControl(this.adminService.adminFormData.companyEmailAddress,
                ),
              companyStreetAddress: new FormControl(this.adminService.adminFormData.companyStreetAddress,
                ),
              city: new FormControl(this.adminService.adminFormData.companyCity,
                ),
              state: new FormControl(this.adminService.adminFormData.companyState,
                ),
              zipCode: new FormControl(this.adminService.adminFormData.companyZip,
                ),
              phoneNumber: new FormControl(this.adminService.adminFormData.companyPhoneNumber,
                ),
            }),
            countyInformation: new FormGroup({
              contractWorkOrderNumber: new FormControl(this.adminService.adminFormData.contractWorkOrderNumber,
                ),
              contractExpirationDate: new FormControl(this.adminService.adminFormData.contractWorkOrderNumber,
                ),
              countyEmailAddress: new FormControl(this.adminService.adminFormData.countyEmailAddress,
                ),
              phoneNumber: new FormControl(this.adminService.adminFormData.businessPhoneNumber
                ),
              departmentName: new FormControl(this.adminService.adminFormData.departmentName
                ),
              departmentNumber: new FormControl(this.adminService.adminFormData.departmentNumber
                ),
              businessStreetAddress: new FormControl(this.adminService.adminFormData.businessStreetAddress),
              businessCity: new FormControl(this.adminService.adminFormData.businessCity
                ),
              businessZipCode: new FormControl(this.adminService.adminFormData.businessZip
                ),
            }),
            policyRulesInformation: new FormGroup ({
              applyDefaultCountywidePolicyIsChecked: new FormControl(this.adminService.adminFormData.applyDefaultCountywidePolicyIsChecked),
              departmentPolicyRule0IsChecked: new FormControl(this.adminService.adminFormData.departmentPolicyRule0),
              departmentPolicyRule1IsChecked: new FormControl(this.adminService.adminFormData.departmentPolicyRule1),
              departmentPolicyRule2IsChecked: new FormControl(this.adminService.adminFormData.departmentPolicyRule2),
              departmentPolicyRule3IsChecked: new FormControl(this.adminService.adminFormData.departmentPolicyRule3),
              departmentPolicyRule4IsChecked: new FormControl(this.adminService.adminFormData.departmentPolicyRule4),
              socialNetworkingFacebookIsChecked: new FormControl(this.adminService.adminFormData.socialNetworkingFacebookIsChecked),
              socialNetworkingTwitterIsChecked: new FormControl(this.adminService.adminFormData.socialNetworkingTwitterIsChecked),
              socialNetworkingLinkedInIsChecked: new FormControl(this.adminService.adminFormData.socialNetworkingLinkedInIsChecked),
              typeOfRegistration: new FormControl(this.adminService.adminFormData.typeOfRegistration),
            }),
            accessInformation: new FormGroup ({
              //IBM Data Center Access
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
            authorizedInformation: new FormGroup ({
              countyDeptName: new FormControl(null
                 ),
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

}}

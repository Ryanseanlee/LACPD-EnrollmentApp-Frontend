import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminLoggedIn = new BehaviorSubject<boolean>(this.isAdminLoggedIn());

  // tranferring form data in admin side between components
  public adminFormData: any;
  // hold password for admin
  public adminPassword: any;

  constructor(private http: HttpClient, private router: Router) {
    this.init();
  }

  // This method does some initialization work for the service.
  init(): void {
    // Checking if the admin is already logged in, will also initialize adminLoggedIn
    if (this.isAdminLoggedIn()) {
      this.adminPassword = sessionStorage.getItem('password');
    }
  }

  // Checks if admin is logged in by searching for password in session storage
  isAdminLoggedIn(): boolean {
    const passwordFromStorage = sessionStorage.getItem('password');
    if (passwordFromStorage === null) {
      return false;
    } else {
      return true;
    }
  }

  //This function sets password
  setAdminCredentials(passwordFromAdmin: string): void {
    this.adminPassword = passwordFromAdmin;
    sessionStorage.setItem('password', passwordFromAdmin);
  }

  // This function lets the rest of the app know of a logged in change
  emitAdminLoggedInChange(newLoggedStatus: boolean): void {
    this.adminLoggedIn.next(newLoggedStatus);
  }

  // Logout admin
  logAdminOut(): void {
    sessionStorage.removeItem('password');
    // Notify the rest of the app that the admin logged out
    this.emitAdminLoggedInChange(false);
    this.router.navigate(['/admin']);
  }

  // access service_requests for admins by id
  public searchById(requestNumber: any): Observable<any> {
    // set the password in headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };

    return this.http.get(
      `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
      httpOptions
    );
  }

  // display all service_requests in observable array
  public display(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/service_requests`,
      httpOptions
    );
  }

  // reset password
  public resetPassword(old: string, newPass: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: old,
        'new-password': newPass,
      }),
    };
    //sessionStorage.setItem('password', newPass);
    return this.http.patch(
      `${environment.apiUrl}/admin/reset_password`,
      httpOptions,
      httpOptions
    );
  }

  //reformat data for admin-employee
  public reformatDataPostEmployee(data: any, isComplete: boolean): string {
    const reformated = {
      // Form specific data
      complete: isComplete,
      employee: true, // Since it is the employee form

      // Personal Information
      lastName: data.personalInformation.lastName,
      firstName: data.personalInformation.firstName,
      middleInitial: data.personalInformation.middleInitial,
      employeeEmailAddress: data.personalInformation.emailAddress,
      businessPhoneNumber: data.personalInformation.phoneNumber,
      employeeNumber: data.personalInformation.employeeNumber,

      // Address Information
      businessStreetAddress: data.addressInformation.address,
      businessCity: data.addressInformation.city,
      businessState: data.addressInformation.state,
      businessZip: data.addressInformation.zipCode,

      //internet policy
      defaultCountyWidePolicy:
        data.policyRulesInformation.defaultCountyWidePolicy,
      departmentPolicyRule0: data.policyRulesInformation.departmentPolicyRule0,
      departmentPolicyRule1: data.policyRulesInformation.departmentPolicyRule1,
      departmentPolicyRule2: data.policyRulesInformation.departmentPolicyRule2,
      departmentPolicyRule3: data.policyRulesInformation.departmentPolicyRule3,
      departmentPolicyRule4: data.policyRulesInformation.departmentPolicyRule4,
      socialNetworkingFacebook:
        data.policyRulesInformation.socialNetworkingFacebook,
      socialNetworkingTwitter:
        data.policyRulesInformation.socialNetworkingTwitter,
      socialNetworkingLinkedIn:
        data.policyRulesInformation.socialNetworkingLinkedIn,

      // Access Information
      ibmLogOnId: data.accessInformation.ibmLogonId,
      majorGroupCode: data.accessInformation.majorGroupCode,
      lsoGroupCode: data.accessInformation.lsoGroupCode,
      securityAuthorization: data.accessInformation.securityAuthorization,
      unixLogOnId: data.accessInformation.unixLogonId,
      unixApplication: data.accessInformation.application,
      unixAccessGroup: data.accessInformation.accessGroup,
      unixAccountNumber: data.accessInformation.accountNumber,
      billingAccountNumber: data.accessInformation.billingAccountNumber,

      // FIXME: On server side accessType(securid) might be misssing
      // Additional Information
      internetApplication: data.additionalInformation.internetApplication,
      exchangeEmail: data.additionalInformation.exchangeEmail,
      emailEncryption: data.additionalInformation.emailEncryption,
      laCountyGovAccess: data.additionalInformation.laCountyGovAccess,
      tokenlessAuthentication:
        data.additionalInformation.tokenlessAuthentication,
      lacMobileWifiAccess: data.additionalInformation.lacMobileWifiAccess,
      cherwellSms: data.additionalInformation.cherwellSms,
      windowsRightsMgmt: data.additionalInformation.windowsRightsMgmt,

      //managers info
      managerFirstName: data.managerInformation.managerFirstName,
      managerLastName: data.managerInformation.managerLastName,
      managerEmail: data.managerInformation.managerEmail,
      managerPhone: data.managerInformation.managerPhone,
      managerTitle: data.managerInformation.managerTitle,

      //signatures-department Head left, since theres no policy in employee-form
      applicationCoordinatorName: data.signatures.applicationCoordinatorName,
      applicationCoordinatorPhone: data.signatures.applicationCoordinatorPhone,
      applicationCoordinatorEmail: data.signatures.applicationCoordinatorEmail,

      divChiefManagerName: data.signatures.divChiefManagerName,
      divChiefManagerPhone: data.signatures.divChiefManagerPhone,
      divChiefManagerEmail: data.signatures.divChiefManagerEmail,

      deptInfoSecurityOfficerName: data.signatures.deptInfoSecurityOfficerName,
      deptInfoSecurityOfficerPhone:
        data.signatures.deptInfoSecurityOfficerPhone,
      deptInfoSecurityOfficerEmail:
        data.signatures.deptInfoSecurityOfficerEmail,

      departmentHeadName: data.signatures.departmentHeadName,
      departmentHeadPhone: data.signatures.departmentHeadPhone,
      departmentHeadEmail: data.signatures.departmentHeadEmail,
    };
    return JSON.stringify(reformated);
  }

  public reformatDatPostContractor(data: any, isComplete: boolean): string {
    const reformated = {
      // Form specific data
      complete: isComplete,
      employee: false,
      // contractor info
      lastName: data.contractorInformation.lastName,
      firstName: data.contractorInformation.firstName,
      middleInitial: data.contractorInformation.middleInitial,
      companyName: data.contractorInformation.companyName,
      companyEmailAddress: data.contractorInformation.companyEmailAddress,
      companyStreetAddress: data.contractorInformation.companyStreetAddress,
      companyCity: data.contractorInformation.city,
      companyState: data.contractorInformation.state,
      companyZip: data.contractorInformation.zipCode,
      companyPhoneNumber: data.contractorInformation.phoneNumber,
      // county info
      contractWorkOrderNumber: data.countyInformation.contractWorkOrderNumber,
      contractExpirationDate: data.countyInformation.contractExpirationDate,
      countyEmailAddress: data.countyInformation.countyEmailAddress,
      businessPhoneNumber: data.countyInformation.phoneNumber,
      departmentName: data.countyInformation.departmentName,
      departmentNumber: data.countyInformation.departmentNumber,
      businessStreetAddress: data.countyInformation.businessStreetAddress,
      businessCity: data.countyInformation.businessCity,
      businessZip: data.countyInformation.businessZipCode,
      //policy rules info
      defaultCountyWidePolicy:
        data.policyRulesInformation.applyDefaultCountyWidePolicy,
      departmentPolicyRule0: data.policyRulesInformation.departmentPolicyRule0,
      departmentPolicyRule1: data.policyRulesInformation.departmentPolicyRule1,
      departmentPolicyRule2: data.policyRulesInformation.departmentPolicyRule2,
      departmentPolicyRule3: data.policyRulesInformation.departmentPolicyRule3,
      departmentPolicyRule4: data.policyRulesInformation.departmentPolicyRule4,
      socialNetworkingFacebook:
        data.policyRulesInformation.socialNetworkingFacebook,
      socialNetworkingTwitter:
        data.policyRulesInformation.socialNetworkingTwitter,
      socialNetworkingLinkedIn:
        data.policyRulesInformation.socialNetworkingLinkedIn,
      //Additional Access
      ibmLogOnId: data.accessInformation.ibmLogonId,
      majorGroupCode: data.accessInformation.majorGroupCode,
      lsoGroupCode: data.accessInformation.lsoGroupCode,
      securityAuthorization: data.accessInformation.securityAuthorization,
      unixLogOnId: data.accessInformation.unixLogonId,
      unixApplication: data.accessInformation.application,
      unixAccessGroup: data.accessInformation.accessGroup,
      unixAccountNumber: data.accessInformation.accountNumber,
      billingAccountNumber: data.accessInformation.billingAccountNumber,

      internetApplication: data.additionalInformation.internetApplication,
      exchangeEmail: data.additionalInformation.exchangeEmail,
      emailEncryption: data.additionalInformation.emailEncryption,
      tokenlessAuthentication:
        data.additionalInformation.tokenlessAuthentication,
      lacMobileWifiAccess: data.additionalInformation.lacMobileWifiAccess,
      cherwellSms: data.additionalInformation.cherwellSms,
      windowsRightsMgmt: data.additionalInformation.windowsRightsMgmt,

      //managers info
      managerFirstName: data.managerInformation.managerFirstName,
      managerLastName: data.managerInformation.managerLastName,
      managerEmail: data.managerInformation.managerEmail,
      managerPhone: data.managerInformation.managerPhone,
      managerTitle: data.managerInformation.managerTitle,

      //signatures-department Head left, since theres no policy in employee-form
      applicationCoordinatorName: data.signatures.applicationCoordinatorName,
      applicationCoordinatorPhone: data.signatures.applicationCoordinatorPhone,
      applicationCoordinatorEmail: data.signatures.applicationCoordinatorEmail,

      divChiefManagerName: data.signatures.divChiefManagerName,
      divChiefManagerPhone: data.signatures.divChiefManagerPhone,
      divChiefManagerEmail: data.signatures.divChiefManagerEmail,

      deptInfoSecurityOfficerName: data.signatures.deptInfoSecurityOfficerName,
      deptInfoSecurityOfficerPhone:
        data.signatures.deptInfoSecurityOfficerPhone,
      deptInfoSecurityOfficerEmail:
        data.signatures.deptInfoSecurityOfficerEmail,

      departmentHeadName: data.signatures.departmentHeadName,
      departmentHeadPhone: data.signatures.departmentHeadPhone,
      departmentHeadEmail: data.signatures.departmentHeadEmail,
    };
    return JSON.stringify(reformated);
  }

  //starts adobe process

  //save form -only works for employee requests
  public saveForm(
    requestNumber: any,
    data: object,
    isEmployee: boolean
  ): Observable<any> {
    // set the password in headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    if (isEmployee) {
      return this.http.patch(
        `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
        this.reformatDataPostEmployee(data, false),
        httpOptions
      );
    } else {
      return this.http.patch(
        `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
        this.reformatDatPostContractor(data, false),
        httpOptions
      );
    }
  }

  public submitForm(
    requestNumber: any,
    data: any,
    isEmployee: boolean
  ): Observable<any> {
    // set the password in headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };

    if (isEmployee) {
      return this.http.patch(
        `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
        this.reformatDataPostEmployee(data, true),
        httpOptions
      );
    } else {
      return this.http.patch(
        `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
        this.reformatDatPostContractor(data, true),
        httpOptions
      );
    }
  }

  //reformat div chief
  public reformatPostApprovers(data: any): string {
    const reformated = {
      name: data.name,
      phone: data.phone,
      email: data.email,
    };
    return JSON.stringify(reformated);
  }

  //div_chief: get
  public getAllDivChief(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/div_chief_managers`,
      httpOptions
    );
  }

  public getDivChief(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/div_chief_managers/${id}`,
      httpOptions
    );
  }

  public postDivChief(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/admin/div_chief_managers`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public patchDivChief(id: any, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.patch(
      `${environment.apiUrl}/admin/div_chief_managers/${id}`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public deleteDivChief(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.delete(
      `${environment.apiUrl}/admin/div_chief_managers/${id}`,
      httpOptions
    );
  }

  //department head

  public getAllDeptHead(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/department_heads`,
      httpOptions
    );
  }

  public getDeptHead(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/department_heads/${id}`,
      httpOptions
    );
  }

  public postDeptHead(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/admin/department_heads`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public patchDeptHead(id: any, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.patch(
      `${environment.apiUrl}/admin/department_heads/${id}`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public deleteDeptHead(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.delete(
      `${environment.apiUrl}/admin/department_heads/${id}`,
      httpOptions
    );
  }

  //application_coordinators

  public getAllAppCoord(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/application_coordinators`,
      httpOptions
    );
  }

  public getAppCoord(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/application_coordinators/${id}`,
      httpOptions
    );
  }

  public postAppCoord(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/admin/application_coordinators`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public patchAppCoord(id: any, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.patch(
      `${environment.apiUrl}/admin/application_coordinators/${id}`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public deleteAppCoord(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.delete(
      `${environment.apiUrl}/admin/application_coordinators/${id}`,
      httpOptions
    );
  }

  //dept_info_security_officers

  public getAllDeptInfoSec(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/dept_info_security_officers`,
      httpOptions
    );
  }

  public getDeptInfoSec(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/dept_info_security_officers/${id}`,
      httpOptions
    );
  }

  public postDeptInfoSec(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.post(
      `${environment.apiUrl}/admin/dept_info_security_officers`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public patchDeptInfoSec(id: any, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.patch(
      `${environment.apiUrl}/admin/dept_info_security_officers/${id}`,
      this.reformatPostApprovers(data),
      httpOptions
    );
  }

  public deleteDeptInfoSec(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        password: this.adminPassword,
      }),
    };
    return this.http.delete(
      `${environment.apiUrl}/admin/dept_info_security_officers/${id}`,
      httpOptions
    );
  }
}

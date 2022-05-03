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

  // hold username for admin
  public adminUsername: any;

  // hold password for admin
  public adminPassword: any;

  constructor(private http: HttpClient, private router: Router) {
    this.init();
  }

  // This method does some initialization work for the service.
  init(): void {
    // Checking if the admin is already logged in, will also initialize adminLoggedIn
    if (this.isAdminLoggedIn()) {
      this.adminUsername = sessionStorage.getItem('email');
      this.adminPassword = sessionStorage.getItem('password');
    }
  }

  // Checks if admin is logged in by searching for password in session storage
  isAdminLoggedIn(): boolean {
    const usernameFromStorage = sessionStorage.getItem('email');
    const passwordFromStorage = sessionStorage.getItem('password');
    if (passwordFromStorage === null) {
      return false;
    } else {
      return true;
    }
  }

  // This function sets username
  setAdminUsername(usernameFromAdmin: string): void {
    this.adminUsername = usernameFromAdmin;
    sessionStorage.setItem('email', usernameFromAdmin);
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
    // set the username/password in headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        email: this.adminUsername,
        password: this.adminPassword
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
        email: this.adminUsername,
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
        email: this.adminUsername
      }),
    };
    //sessionStorage.setItem('password', newPass);
    return this.http.patch(
      `${environment.apiUrl}/admin/reset_password`,
      httpOptions,
      httpOptions
    );
  }

  public newAdmin(firstName: string, middleName: string, lastName: string, email: string, password: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        email:this.adminUsername,
        password:this.adminPassword,
        'newemail': email,
        'newpassword': password,
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
      }),
    };
    return this.http.patch(
      `${environment.apiUrl}/admin/Create_User`,
      httpOptions,
      httpOptions
    );

  }

  //reformat data for admin-employee
  public reformatDataPostEmployee(data: any, isComplete: boolean): string {
    const reformated = {
      // Form specific data
      complete: isComplete,
      isEmployee: data.personalInformation.isEmployee, // Since it is the employee form

      // Personal Information
      createDate: data.personalInformation.createDate,
      lastName: data.personalInformation.lastName,
      firstName: data.personalInformation.firstName,
      middleInitial: data.personalInformation.middleInitial,
      emailAddress: data.personalInformation.emailAddress,
      phoneNumber: data.personalInformation.phoneNumber,
      workPhoneNumber: data.personalInformation.workPhoneNumber,
      countyDepartmentName: data.personalInformation.countyDepartmentName,
      countyDepartmentNumber :data.personalInformation.countyDepartmentNumber,
      contractorName: data.personalInformation.contractorName,
      workOrderNumberInput: data.personalInformation.workOrderNumberInput,
      employeeNumber: data.personalInformation.employeeNumber,
      expirationDate : data.personalInformation.expirationDate,


      // Address Information
      address: data.addressInformation.address,
      city: data.addressInformation.city,
      state: data.addressInformation.state,
      zipCode: data.addressInformation.zipCode,

      //internet policy
      countyWidePolicyA: data.policyRulesInformation.countyWidePolicyA,
      countyWidePolicyB: data.policyRulesInformation.countyWidePolicyB,
      allWebmail: data.policyRulesInformation.allWebmail,
      streamMedia: data.policyRulesInformation.streamMedia,
      justification: data.policyRulesInformation.justification,
      

      // Access Information
      ibmLogonId: data.accessInformation.ibmLogonId,
      majorGroupCode: data.accessInformation.majorGroupCode,
      lsoGroupCode: data.accessInformation.lsoGroupCode,
      securityAuthorization: data.accessInformation.securityAuthorization,
      unixLogonId: data.accessInformation.unixLogonId,
      application: data.accessInformation.application,
      accessGroup: data.accessInformation.accessGroup,
      billingAccountNumber: data.accessInformation.billingAccountNumber,

      // FIXME: On server side accessType(securid) might be misssing
      // Additional Information
      laCountyGovAccess: data.additionalInformation.laCountyGovAccess,
      lacMobileWifiAccess: data.addressInformation.lacMobileWifiAccess,
      o360Email: data.additionalInformation.o360Email,
     

      //managers info
      managerFirstName: data.managerInformation.managerFirstName,
      managerLastName: data.managerInformation.managerLastName,
      managerEmail: data.managerInformation.managerEmail,
      managerPhone: data.managerInformation.managerPhone,

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

  public getAdminInfo(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        email: this.adminUsername,
        password: this.adminPassword,
      }),
    };
    return this.http.get(
      `${environment.apiUrl}/admin/details`,
      httpOptions
    );
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
        email: this.adminUsername,
        password: this.adminPassword,
      }),
    };
   
      return this.http.patch(
        `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
        this.reformatDataPostEmployee(data, false),
        httpOptions,
      );
    
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
        email: this.adminUsername,
        password: this.adminPassword,
      }),
    };
  
    return this.http.patch(
      `${environment.apiUrl}/admin/service_requests/${requestNumber}`,
      this.reformatDataPostEmployee(data, true),
      httpOptions
    );
  
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
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
        email: this.adminUsername,
        password: this.adminPassword,
      }),
    };
    return this.http.delete(
      `${environment.apiUrl}/admin/dept_info_security_officers/${id}`,
      httpOptions
    );
  }
}

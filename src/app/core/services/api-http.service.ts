import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// TODO: Refactor createForm into one method and ask whether it is employee or contractor then
// simple if statement
@Injectable()
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * @description This method transforms the form group into the format that the server will accept.
   * @param data This is the value field of the FormGroup. eg. FormGroup.value
   * @param isComplete If the form is complete we have to let the server know that it is complete.
   * @returns A string representation of the json object that is accepted by the backend server.
   */
  public reformatDataPostEmployee(data: any, isSubmitted: boolean): string {
    const reformated = {
      // Form specific data
      submitted: isSubmitted,
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

      // Internet Access
      defaultCountyWidePolicy: data.internetAccess.applyDefaultCountyWidePolicy,
      departmentPolicyRule0: data.internetAccess.departmentPolicyRule0,
      departmentPolicyRule1: data.internetAccess.departmentPolicyRule1,
      departmentPolicyRule2: data.internetAccess.departmentPolicyRule2,
      departmentPolicyRule3: data.internetAccess.departmentPolicyRule3,
      departmentPolicyRule4: data.internetAccess.departmentPolicyRule4,
      socialNetworkingFacebook: data.internetAccess.socialNetworkingFacebook,
      socialNetworkingTwitter: data.internetAccess.socialNetworkingTwitter,
      socialNetworkingLinkedIn: data.internetAccess.socialNetworkingLinkedIn,

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
      // TODO: Add managerTitle
      // Mananger Information
      managerFirstName: data.managerInformation.managerFirstName,
      managerLastName: data.managerInformation.managerLastName,
      managerEmail: data.managerInformation.managerEmail,
      managerPhone: data.managerInformation.managerPhoneNumber,
    };
    return JSON.stringify(reformated);
  }

  public reformatContractData(data: any): string {
    const reformated = {
      // Form specific data
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
      ibmLogOnId: data.additionalAccessInformation.ibmLogonId,
      majorGroupCode: data.additionalAccessInformation.majorGroupCode,
      lsoGroupCode: data.additionalAccessInformation.lsoGroupCode,
      securityAuthorization:
        data.additionalAccessInformation.securityAuthorization,
      unixLogOnId: data.additionalAccessInformation.unixLogonId,
      unixApplication: data.additionalAccessInformation.application,
      unixAccessGroup: data.additionalAccessInformation.accessGroup,
      unixAccountNumber: data.additionalAccessInformation.accountNumber,
      billingAccountNumber:
        data.additionalAccessInformation.billingAccountNumber,
    };
    return JSON.stringify(reformated);
  }

  /**
   * @description This method will create the form serverside. Handles both employee and contractor forms.
   * @param data This is the value field of the FormGroup object. eg. FormGroup.value
   * @param isEmployee If the form is from an employee, set this to true. Else, it will be considered a contractor form serverside.
   * @returns An observable that will return the created form back from the server.
   */
  public createForm(data: any, isEmployee: boolean): Observable<any> {
    if (isEmployee) {
      return this.http.post(
        `${environment.apiUrl}/service_requests`,
        this.reformatDataPostEmployee(data, false), // Initially creating the form
        this.httpOptions
      );
      // Contractor form
    } else {
      return this.http.post(
        `${environment.apiUrl}/service_requests`,
        this.reformatContractData(data),
        this.httpOptions
      );
    }
  }

  /**
   * @description ONLY use this method when the form is completed (in the submit page)
   * @param data This is the value field of the FormGroup object. eg. FormGroup.value
   * @param isEmployee Whether the form is from an employee or not.
   * @returns An observable that will return the created form back from the server.
   */
  public submitForm(data: any, isEmployee: boolean): Observable<any> {
    if (isEmployee) {
      return this.http.post(
        `${environment.apiUrl}/service_requests`,
        this.reformatDataPostEmployee(data, true), // Form is complete
        this.httpOptions
      );
    } else {
      return this.http.post(
        `${environment.apiUrl}/service_requests`,
        this.reformatContractData(data), // Call the contractor formatter
        this.httpOptions
      );
    }
  }

  /**
   * @description This function is used to get the form in the homescreen. Will basically just retrieve
   * a specific form by it's request number.
   * @param requestNumber The requestNumber is the number by which the forms are identified by. eg. the form's id.
   * @returns An Observable the will contain the form object.
   */
  public getFormByRequestNumber(requestNumber: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/service_requests/` + requestNumber,
      this.httpOptions
    );
  }

  /**
   * @description This function save's the form on the server.
   * @param requestNumber The form's request number. This is used by the server to retrieve the form.
   * @param markAsSubmitted If this is true, the submitted field will be true. This is need for the backend to begin processing
   * the request.
   * @param data This is the data that we want to save.
   * @returns An Observable with the update data. This is returned by the server.
   */
  public saveForm(
    requestNumber: string,
    markAsSubmitted: boolean,
    data: object
  ): Observable<any> {
    if (markAsSubmitted) {
      return this.http.put(
        `${environment.apiUrl}/service_requests/${requestNumber}/`,
        this.reformatDataPostEmployee(data, true),
        this.httpOptions
      );
    } else {
      return this.http.put(
        `${environment.apiUrl}/service_requests/${requestNumber}/`,
        this.reformatDataPostEmployee(data, false),
        this.httpOptions
      );
    }
  }
}

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
      employee: data.personalInformation.isEmployee, // Since it is the employee form

      // Personal Information\
      createDate: data.personalInformation.createDate,
      lastName: data.personalInformation.lastName,
      firstName: data.personalInformation.firstName,
      middleInitial: data.personalInformation.middleInitial,
      emailAddress: data.personalInformation.emailAddress,
      phoneNumber: data.personalInformation.phoneNumber,
      workPhoneNumber: data.personalInformation.workPhoneNumber,
      employeeNumber: data.personalInformation.employeeNumber,
      countyDepartmentName: data.personalInformation.countyDepartmentName,
      countyDepartmentNumber: data.personalInformation.countyDepartmentNumber,
      contractorName: data.personalInformation.contractorName,
      workOrderNumberInput: data.personalInformation.workOrderNumberInput,
      expirationDate: data.personalInformation.expirationDate,

      // Address Information
      address: data.addressInformation.address,
      city: data.addressInformation.city,
      state: data.addressInformation.state,
      zipCode: data.addressInformation.zipCode,

      // Internet Access
      countyWidePolicyA: data.internetAccess.countyWidePolicyA,
      countyWidePolicyB: data.internetAccess.countyWidePolicyB,
      allWebmail: data.internetAccess.allWebmail,
      streamMedia: data.internetAccess.streamMedia,
      justification: data.internetAccess.justification,

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
      lacMobileWifiAccess: data.additionalInformation.lacMobileWifiAccess,
      o365Email: data.additionalInformation.o365Email,
      // TODO: Add managerTitle
      // Mananger Information
      managerFirstName: data.managerInformation.managerFirstName,
      managerLastName: data.managerInformation.managerLastName,
      managerEmail: data.managerInformation.managerEmail,
      managerPhone: data.managerInformation.managerPhone,

      //approvers

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
      // return this.http.post(
      //   `${environment.apiUrl}/service_requests`,
      //   this.reformatContractData(data),
      //   this.httpOptions
      // );
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
      // return this.http.post(
      //   `${environment.apiUrl}/service_requests`,
      //   this.reformatContractData(data), // Call the contractor formatter
      //   this.httpOptions
      // );
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

import { FormGroup } from '@angular/forms';

export class EmployeeFormDTO {
  // This information is about the form itself
  requestNumber: number;
  createDate: string;
  submitDate: string;
  isEmployee: boolean;
  requestStatus: string;
  isComplete: boolean;
  agreementId: string;



  // Personal Information
  lastName: string;
  firstName: string;
  middleInitial: string;
  emailAddress: string;
  phoneNumber: string;
  workPhoneNumber: string;
  countyDepartmentName: string;
  countyDepartmentNumber: string;
  contractorName: string;
  workOrderNumberInput: string;
  employeeNumber: string;
  expirationDate: string;

  //addressInformation

  // Customer Information
  address: string;
  city: string;
  state: string;
  zipCode: string;

     // Internet Access
  countyWidePolicyA: boolean;
  countyWidePolicyB: boolean;
  allWebmail: boolean;
  streamMedia: boolean;
  justification: string;

  // Access Information
  ibmLogonId: string;
  majorGroupCode: string;
  lsoGroupCode: string;
  securityAuthorization: string;

  unixLogonId: string;
  application: string;
  accessGroup: string;
  
  billingAccountNumber: string;

  // additional Requested
  laCountyGovAccess: boolean;
  lacMobileWifiAccess: boolean;
  o360Email: boolean;


  // Profile Information (might not be done)
  replaceLostToken: boolean;
  addLogonId: boolean;
  changeLogonId: boolean;
  deleteLogonId: boolean;




  // TODO: Ask if these are for contractor form
  //   companyName;
  //   companyEmailAddress;
  //   countyEmailAddress;

  //   workMailingAddress;
  //   companyStreetAddress;
  //   companyCity;
  //   companyState;
  //   companyZip;
  //   companyPhoneNumber;
  //   countyPhoneNumber;
  //   contractWorkOrderNumber;
  //   contractExpirationDate;

  /**
   * A representation of the data that is stored serverside. This class can be used to
   * send the employee form to the server.
   * @param formGroup The FormGroup object
   */
  // TODO: Add requestNumber as a param
  constructor(formGroup: FormGroup) {
    const personalInformation = formGroup.value.personalInformation;
    const addressInformation = formGroup.value.addressInformation;
    const employeeInformation = formGroup.value.employeeInformation;
    const accessInformation = formGroup.value.accessInformation;
    const additionalInformation = formGroup.value.additionalInformation;

    this.createDate = addressInformation.createDate;

    // Form stuff
    if (formGroup.value.requestNumber !== null) {
      this.requestNumber = formGroup.value.requestNumber;
    }

    // Personal Information
    this.workPhoneNumber = personalInformation.workPhoneNumber;
    this.lastName = personalInformation.lastName;
    this.firstName = personalInformation.firstName;
    this.middleInitial = personalInformation.middleInitial;
    this.emailAddress = personalInformation.emailAddress;
    this.phoneNumber = personalInformation.phoneNumber;
    this.countyDepartmentName = personalInformation.countyDepartmentName;
    this.countyDepartmentNumber = personalInformation.countyDepartmentNumber;
    this.contractorName = personalInformation.contractorName;
    this.workOrderNumberInput = personalInformation.workOrderNumberInput;
    

    // Address Information
    this.address = addressInformation.address;
    this.city = addressInformation.city;
    this.state = addressInformation.state;
    this.zipCode = addressInformation.zipCode;

    // Employee Information
    this.employeeNumber = employeeInformation.employeeNumber;
    this.expirationDate = personalInformation.expirationDate;

    // Access Information
    this.ibmLogonId = accessInformation.ibmLogonId;
    this.majorGroupCode = accessInformation.majorGroupCode;
    this.lsoGroupCode = accessInformation.lsoGroupCode;
    this.securityAuthorization = accessInformation.securityAuthorization;
    this.unixLogonId = accessInformation.unixLogonId;
    this.application = accessInformation.application;
    this.accessGroup = accessInformation.accessGroup;
    this.billingAccountNumber = accessInformation.billingAccountNumber;

    

    // Additional Information
    this.laCountyGovAccess = additionalInformation.laCountyGovAccess;
    this.lacMobileWifiAccess = additionalInformation.lacMobileWifiAccess;
    this.o360Email = additionalInformation.o360Email;
  }
}

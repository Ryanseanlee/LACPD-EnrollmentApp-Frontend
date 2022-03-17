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

  // Type of Registration
  newRegistration: boolean;
  deletePriorRegistration: boolean;
  updatePriorRegistration: boolean;

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
  businessStreetAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;

  // Applications Requested
 
  laCountyGovAccess: boolean;
  lacMobileWifiAccess: boolean;
  o360Email: boolean;

  // Personal Webmail Access
  gmailAccess: boolean;
  yahooMailAccess: boolean;
  otherEmailAccess: boolean;
  otherEmailDomain: string;
  businessJustification: string;

  // Profile Information (might not be done)
  replaceLostToken: boolean;
  addLogonId: boolean;
  changeLogonId: boolean;
  deleteLogonId: boolean;

  // IBM Data Center Access
  ibmLogOnId: string;
  majorGroupCode: string;
  lsoGroupCode: string;
  securityAuthorization: string;
  tsoAccess: boolean;
  tsoGroupCode: string;
  binNumber: string;
  subGroup1: string;
  subGroup2: string;
  subGroup3: string;
  onlineAccess: boolean;
  systemApplication: string;
  groupName: string;
  oldGroup: string;

  // Unix Environment Access
  unixAddLogonId: boolean;
  unixChangeLogonId: boolean;
  unixDeleteLogonId: boolean;
  unixLogOnId: string;
  unixApplication: string;
  unixAccessGroup: string;
  unixAccountNumber: string;

  // SecurID Remote Access
  billingAccountNumber: string; // TODO: Request name change to billingAccountNumberForSecurIDToken
  secureIdVpn: boolean;
  adaptiveAuthenticationVpn: boolean;

  // Department Policy Rules
  countyWidePolicyA: boolean;
  countywidePolicyB: boolean;
  allWebmail: boolean;
  streamingMedia: boolean;
  justification: string;

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
    this.businessStreetAddress = addressInformation.address;
    this.businessCity = addressInformation.city;
    this.businessState = addressInformation.state;
    this.businessZip = addressInformation.zipCode;

    // Employee Information
    this.employeeNumber = employeeInformation.employeeNumber;
    this.expirationDate = personalInformation.expirationDate;

    // Access Information
    this.ibmLogOnId = accessInformation.ibmLogonId;
    this.majorGroupCode = accessInformation.majorGroupCode;
    this.lsoGroupCode = accessInformation.lsoGroupCode;
    this.securityAuthorization = accessInformation.securityAuthorization;
    // this.tsoAccess: boolean;
    // this.tsoGroupCode: string;
    // this.binNumber: string;
    // this.subGroup1: string;
    // this.subGroup2: string;
    // this.subGroup3: string;
    // this.onlineAccess: boolean;
    // this.systemApplication: string;
    // this.groupName: string;
    // this.oldGroup: string;
    // this.unixAddLogonId:
    // this.unixChangeLogonId:
    // this.unixDeleteLogonId
    this.unixLogOnId = accessInformation.unixLogonId;
    this.unixApplication = accessInformation.application;
    this.unixAccessGroup = accessInformation.accessGroup;
    this.unixAccountNumber = accessInformation.billingAccountNumber;

    

    // Additional Information
    this.laCountyGovAccess = additionalInformation.laCountyGovAccess;
    this.lacMobileWifiAccess = additionalInformation.lacMobileWifiAccess;
    this.o360Email = additionalInformation.o360Email;
  }
}

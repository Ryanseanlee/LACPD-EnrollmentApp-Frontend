/**
 * This file will hold the formgroup objects (initialize FormGroup eg. FormGroup(<HERE>)
 *
 * */

import { FormControl, FormGroup } from '@angular/forms';

const EMPLOYEE_FORM = {
  information: new FormGroup({
    lastName: new FormControl(null),
    firstName: new FormControl(null),
    middleInitial: new FormControl(null),
    emailAddress: new FormControl(null),
    phoneNumber: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    zipCode: new FormControl(null),
  }),
  employeeInformation: new FormGroup({
    employeeNumber: new FormControl(null),
    hostedId: new FormControl(null),
  }),
  // accessInformation: TODO: Fill this out later
  // additionalInformation: new FormGroup({
  // })
  // TODO: Fill out the rest
};

const CONTRACTOR_FORM = {};

export const FormGroups = {
  EMPLOYEE_FORM: EMPLOYEE_FORM,
  CONTRACTOR_FORM: CONTRACTOR_FORM,
};

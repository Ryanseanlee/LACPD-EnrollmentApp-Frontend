import { Injectable } from '@angular/core';

/**
 * This service holds the data for the confirmation page.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmationPageService {
  /**
   * If you want to render the admin confirmation page, set this to true.
   */
  isAdmin: boolean;

  /**
   * The request number of the form that was submitted.
   */
  requestNumber: any;

  constructor() {}
}

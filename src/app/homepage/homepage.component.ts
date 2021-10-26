import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from '../core/services/api-http.service';
import { FormDataService } from '../core/services/form-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '400ms',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '400ms',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  /**
   * @description this variable is responsible for keeping track
   * of the steps. (0 = homepage, 1 = Asking the user's type, 2 = Getting the request number, if continuing
   * form)
   *
   */
  stepCounter: number;

  // Whether the user is an employee or contractor
  userType: string;
  // Whether the user will continue a form or create a new one
  continueForm: boolean;
  // Where we will store request number
  requestNumber: number;
  constructor(
    private router: Router,
    private apiHttpService: ApiHttpService,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    // Will render homepage by default
    this.stepCounter = 0;
  }
  /**
   *  TODO: Add conditionals to prevent step from going below -1 or
   * higher than 3
   */
  nextStep(): void {
    this.stepCounter += 1;
  }
  previousStep(): void {
    this.stepCounter -= 1;
  }

  selectEmployee(): void {
    if (this.continueForm) {
      this.userType = 'employee';
      this.nextStep();
    } else {
      // Clear form data service
      this.formDataService.formData = undefined;
      this.router.navigate(['/employee-form']);
    }
  }

  selectContractor(): void {
    if (this.continueForm) {
      this.userType = 'contractor';
      this.nextStep();
    } else {
      // Clear form data service
      this.formDataService.formData = undefined;
      this.router.navigate(['/contractor-form']);
    }
  }

  selectContinueForm(): void {
    this.continueForm = true;
  }

  handleStartButtonClick(): void {
    this.continueForm = false;
    this.nextStep();
  }

  handleContinueButtonClick(): void {
    this.continueForm = true;
    this.nextStep();
  }
  /** This function is responsible for retrieving the form  */
  retrieveForm(): void {
    // use service to grab form
    this.apiHttpService
      .getFormByRequestNumber(this.requestNumber)
      .subscribe((res) => {
        // Save form to service
        this.formDataService.formData = res;
        // navigate to employee form if the
        // user chose employeee
        if (this.userType === 'employee') {
          this.router.navigate(['/employee-form']);
        } else {
          this.router.navigate(['/contractor-form']);
        }
      });
  }
  // testing
  printRequestNumber(): void {
    console.log(this.requestNumber);
  }
}

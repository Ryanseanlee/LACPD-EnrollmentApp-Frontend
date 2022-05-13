import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { ConfirmationPageService } from 'src/app/core/services/confirmation-page.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css'],
})

/**
 * An idea: check if form is saved to FormDataService in ngOnInit,
 * if so then make regForm the form in FormDataService. Will prevent the
 * need to have if else statement in onClick()
 */
export class SubmitPageComponent implements OnInit {
  @Input() regForm: FormGroup;
  @Input() setSubmitResponse: (response: object) => void; // Function to update parent (employee-form.component)
  // Function to move to desired step(index)
  @Input() moveIndex: (newIndex: number) => void;
  @Input() setIsLoading: (value: boolean) => void;

  constructor(
    private apiHttpService: ApiHttpService,
    private formDataService: FormDataService,
    private confirmationPageService: ConfirmationPageService,
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {}

  onClickSave(): void {
    // If there is a form in formData then there is a form in progress
    if (this.formDataService.formData !== undefined) {
      // Render the loading screen
      this.setIsLoading(true);
      // Save the form
      this.apiHttpService
        .saveForm(
          this.formDataService.formData.requestNumber,
          true,
          this.regForm.value
        )
        .subscribe({
          next: (response) => {
            // Set the formData to the response, might be needed somewhere else
            this.formDataService.formData = response;
            this.confirmationPageService.requestNumber = response.requestNumber;
            this.confirmationPageService.isAdmin = false; // Render the default confirmation page
            this.router.navigate(['confirmation-page']);
          },
          error: (error) => {
            // Remove loading screen
            this.setIsLoading(false);
            // Notify user that something went wrong
            alert('Something went wrong!');
          },
        });

      // If the else statement executes, then the user probably didn't save their progress
      // as they were completing the form
    } else {
      this.setIsLoading(true);
      this.apiHttpService.submitForm(this.regForm.value,true).subscribe({
        next: (response) => {
          this.confirmationPageService.requestNumber = response.requestNumber;
          this.confirmationPageService.isAdmin = false; // Render the default confirmation page
          this.router.navigate(['confirmation-page']);
        },
        error: (error) => {
          // Remove the loading screen
          this.setIsLoading(false);
          // Notify the user that an error occured
          alert('Something went wrong!');
          throw new Error(error.message);
        },
      });
    }
  }
  // This function is for testing purposes. It will not mark isCompleted as true(it should be if submitting form this step)
  onClickSubmit(): void {
    
    if (this.formDataService.formData !== undefined) {
      // Render the loading screen
      this.setIsLoading(true);
      // Save the form
      this.apiHttpService
        .saveForm(
          this.formDataService.formData.requestNumber,
          true,
          this.regForm.value
        )
        .subscribe({
          next: (response) => {
            // Set the formData to the response, might be needed somewhere else
            this.formDataService.formData = response;
            this.confirmationPageService.requestNumber = response.requestNumber;
            this.confirmationPageService.isAdmin = false; // Render the default confirmation page
          },
          error: (error) => {
            // Remove loading screen
            this.setIsLoading(false);
            // Notify user that something went wrong
            alert('Something went wrong!');
          },
        });

      // If the else statement executes, then the user probably didn't save their progress
      // as they were completing the form
    } else {
      this.setIsLoading(true);
      this.apiHttpService.submitForm(this.regForm.value,true).subscribe({
        next: (response) => {
          this.confirmationPageService.requestNumber = response.requestNumber;
          this.confirmationPageService.isAdmin = false; // Render the default confirmation page
        },
        error: (error) => {
          // Remove the loading screen
          this.setIsLoading(false);
          // Notify the user that an error occured
          alert('Something went wrong!');
          throw new Error(error.message);
        },
      });
    }
    alert("Hello");
    this.adminService
      .submitForm(
        this.formDataService.formData.requestNumber,
        this.regForm.value,
        true
      )
      .subscribe({
        next: (response) => {
          this.formDataService.formData = response;
          this.confirmationPageService.requestNumber = response.requestNumber;
          this.confirmationPageService.isAdmin = true;
          this.router.navigate(['/confirmation-page']);
          console.log(response);
        },
      });
  }
}

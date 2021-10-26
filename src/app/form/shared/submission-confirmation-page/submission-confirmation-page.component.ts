import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission-confirmation-page',
  templateUrl: './submission-confirmation-page.component.html',
  styleUrls: ['./submission-confirmation-page.component.css'],
})
export class SubmissionConfirmationPageComponent implements OnInit {
  /**
   * The request number of the service request(form).
   */
  @Input() requestNumber: number;

  constructor() {}

  ngOnInit(): void {}
}

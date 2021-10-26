import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationPageService } from '../core/services/confirmation-page.service';

/**
 * Handles the rendering of the confirmation page.
 * This component is dependent on the confirmation-page.service.ts
 */
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent implements OnInit {
  isAdmin: boolean;

  requestNumber: number;

  constructor(
    private confirmationPageService: ConfirmationPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Populate isAdmin from ConfirmationPageService
    this.isAdmin = this.confirmationPageService.isAdmin;

    // Populate requestNumber form ConfirmationPageService
    this.requestNumber = this.confirmationPageService.requestNumber;
    // TODO: Make a guard for this. This is a temporary fix.
    if (this.requestNumber === undefined) {
      this.router.navigate(['']);
    }
  }
}

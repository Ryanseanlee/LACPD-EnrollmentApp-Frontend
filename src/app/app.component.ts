import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-app';
  registrationForm: FormGroup;

  showheader: boolean;

  // if navigation to login page is successful, then don't show header for admin functions
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // if register or login page navigated, dont show
        if (
          event.url === '/admin' ||
          event.url === '/admin/service-requests' ||
          event.url === '/admin/reset-password' ||
          event.url === '/admin/review-request' ||
          event.url === '/admin/service-request-detail'
        ) {
          this.showheader = false;
        } else {
          this.showheader = true;
        }
      }
    });
  }

  ngOnInit(): void {}
}

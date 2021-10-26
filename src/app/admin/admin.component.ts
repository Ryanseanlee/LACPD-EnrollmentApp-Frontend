import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // smoother router transitions
})
export class AdminComponent implements OnInit {
  // to hide password
  hide = true;
  // sessionStorage
  // handle Error message to block out user: 404
  errorMessage: string;
  // alert boolean to show message
  alert = false;
  // admin login formGroup
  formLogin: FormGroup;
  //returnUrl - used to capture requested page url
  returnUrl: string;
  //for loading after form is submitted
  isLoading = false;

  // if navigation to login page is successful, then don't show login header
  constructor(
    private router: Router,
    private adminService: AdminService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  // navigate to request status page
  seeServiceRequest(): Promise<boolean> {
    return this.router.navigate(['/admin/service-requests']);
  }

  // navigate to reset password
  seeResetPassword(): Promise<boolean> {
    return this.router.navigate(['/admin/reset-password']);
  }

  isHomeRoute(): boolean {
    return this.router.url === '/admin';
  }

  adminLogin(): void {
    // save user password to session storage
    this.isLoading = true;
    this.adminService.setAdminCredentials(
      this.formLogin.get('password').value.toString()
    );

    // call display request service: if 404 error from API, then redirected to login page
    this.adminService.display().subscribe({
      next: (response) => {
        // get return url from query parameters or default to home page if logged in
        this.returnUrl =
          this.route.snapshot.queryParams['returnUrl'] ||
          '/admin/service-requests';
        //debug
        console.log(this.returnUrl);

        this.router.navigateByUrl(this.returnUrl);

        //this.seeServiceRequest();
        this.alert = false;
        // clear password input after logging in sucessful
        this.formLogin.reset();

        // Let the rest of the app know that the admin has logged in
        this.adminService.emitAdminLoggedInChange(true);
        //rehide password after logging in
        this.hide = true;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Invalid password entered';
          this.alert = true;
          this.isLoading = false;
          this.isHomeRoute();
        }
      },
    });
    // // get return url from query parameters or default to home page if logged in
    // this.returnUrl =
    //   this.route.snapshot.queryParams['returnUrl'] ||
    //   '/admin/service-requests';
    // //debug
    // console.log(this.returnUrl);

    // this.router.navigateByUrl(this.returnUrl);

    // //this.seeServiceRequest();
    // this.alert = false;
    // // clear password input after logging in sucessful
    // this.formLogin.reset();

    // // Let the rest of the app know that the admin has logged in
    // this.adminService.emitAdminLoggedInChange(true);
    // //rehide password after logging in
    // this.hide = true;

    // (error) => {
    //   if (error.status === 403) {
    //     this.errorMessage = 'Invalid password entered';
    //     this.alert = true;
    //     this.isHomeRoute();
    //   }
    // }
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // Used to determine if it is in mobile form
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  // If an admin is logged in
  isAdminLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminService: AdminService
  ) {
    this.isAdminLoggedIn = this.adminService.adminLoggedIn;
  }

  onLogoutClick(): void {
    this.adminService.logAdminOut();
  }
}

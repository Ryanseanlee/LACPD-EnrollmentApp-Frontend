import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-top-logo',
  templateUrl: './top-logo.component.html',
  styleUrls: ['./top-logo.component.css']
})
export class TopLogoComponent implements OnInit {

  isAdminLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private adminService: AdminService
  ) {
    this.isAdminLoggedIn = this.adminService.adminLoggedIn;
  }

  onLogoutClick(): void {
    this.adminService.logAdminOut();
  }
  ngOnInit(): void {
  }

}

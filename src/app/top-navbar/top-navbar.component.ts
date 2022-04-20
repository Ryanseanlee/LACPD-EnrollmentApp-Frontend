import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {

  ngOnInit(): void {
  }

  isAdminLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private adminService: AdminService
  ) {
    this.isAdminLoggedIn = this.adminService.adminLoggedIn;
  }

  onLogoutClick(): void {
    this.adminService.logAdminOut();
  }

}

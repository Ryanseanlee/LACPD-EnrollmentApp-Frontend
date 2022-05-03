import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  firstName:string;
  middleName:string;
  lastName:string;
  private adminInformation: any;

  isAdminLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private adminService: AdminService
  ) {
    this.isAdminLoggedIn = this.adminService.adminLoggedIn;
  }

  setAdminInformation(){
    this.adminService.getAdminInfo().subscribe((res)=>{
      this.adminInformation = res;
      this.firstName = this.adminInformation[0];
      this.middleName = this.adminInformation[1];
      this.lastName = this.adminInformation[2];
    });
  }

  onLogoutClick(): void {
    this.adminService.logAdminOut();
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
  }


  ngOnInit(): void {
    this.setAdminInformation();
  }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {

  firstName:string;
  middleName:string;
  lastName:string;
  private adminInformation: Array<any> = [];

  ngOnInit(): void {
  }

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
  }

}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private adminService: AdminService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //if session Storge (password) isnt empty, then loggin, else redirect to home
    if (this.adminService.isAdminLoggedIn() == true) {
      //once logged in, logout if url changed outside
      return true;
    }

    this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

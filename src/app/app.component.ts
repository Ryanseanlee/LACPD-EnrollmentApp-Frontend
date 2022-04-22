import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { trigger, transition, group, query, style, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-app';
  registrationForm: FormGroup;
  public navView = true;

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

  getDepth(outlet: RouterOutlet){
    return outlet;
  }

  @HostListener('window: resize', ['$event'])
  onResize(event){
    this.navView = window.innerWidth > 800 ? true : false;
  }

  ngOnInit(): void {
    this.navView = window.innerWidth > 800 ? true : false;
  }
}

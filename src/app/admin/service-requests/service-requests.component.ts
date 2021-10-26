import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css'],
})
export class ServiceRequestsComponent implements OnInit {
  //save each request into array for display
  @Input() personData: Array<any> = [];

  //display columns
  displayedColumns: string[] = [
    'requestNumber',
    'requestStatus',
    'firstName',
    'lastName',
    // 'view',
    'request-review',
    'above-event-history'
  ];
  dataSource: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.adminService.display().subscribe((res) => {
      console.log(res);
      this.personData = res;
      this.dataSource = new MatTableDataSource(this.personData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //view details on button click
  viewDetails(id: any): void {
    this.adminService.searchById(id).subscribe((res) => {
      //debugging
      console.log(res);

      //save res to adminFormdata to transfer between components
      this.adminService.adminFormData = res;
      this.formDataService.formData = res;
      console.log(this.adminService.adminFormData.requestNumber);

      //go to service request details page
      if (this.formDataService.formData.employee == false) {
         this.router.navigate(['/admin/service-contractor-request-detail', this.formDataService.formData.requestNumber]);
       }
       //go to employee form , if true
       else if (this.formDataService.formData.employee == true) {
         this.router.navigate(['/admin/service-employee-request-detail', this.formDataService.formData.requestNumber])

       }
    });
  }

  review(requestNumber: any): void {
    this.adminService.searchById(requestNumber).subscribe((res) => {
      console.log(res);

      this.formDataService.formData = res;

      //if not employee(false) -- go to contractor side

      if (this.formDataService.formData.employee == false) {
        this.router.navigate([
          '/admin/review-contractor',
          this.formDataService.formData.requestNumber,
        ]);
      }
      //go to employee form , if true
      else if (this.formDataService.formData.employee == true) {
        this.router.navigate([
          '/admin/review-employee',
          this.formDataService.formData.requestNumber,
        ]);
      }
    });
  }

  adobeEventHistory(requestNumber: any): void {
    this.adminService.searchById(requestNumber).subscribe((res) => {
      this.formDataService.formData = res;
      this.router.navigate(['/admin/adobe-event-history', this.formDataService.formData.requestNumber]);
    });
  }
}

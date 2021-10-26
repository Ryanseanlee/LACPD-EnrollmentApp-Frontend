import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-adobe-event-history',
  templateUrl: './adobe-event-history.component.html',
  styleUrls: ['./adobe-event-history.component.css'],
})
export class AdobeEventHistoryComponent implements OnInit {
  requestNumber: string;
  eventHistory: Array<any> = [];


  displayedColumns: string[] = ['actionHistory'];
  dataSource: any;

  constructor(
    private formDataService: FormDataService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.requestNumber = this.formDataService.formData.requestNumber;
    this.adminService.searchById(this.requestNumber).subscribe((res) => {
      this.eventHistory = res.eventHistory;

      this.dataSource = new MatTableDataSource(this.eventHistory);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Router } from '@angular/router';
import { nextTick } from 'process';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.css'],
})
export class ApproversComponent implements OnInit {
  errorStateMatcher = new InstantErrorStateMatcher();
  //four arrays
  divChief: Array<any> = [];
  deptInfo: Array<any> = [];
  deptHead: Array<any> = [];
  appCoord: Array<any> = [];

  //two formFroups: newApprover -add, exisitingApprover - delete/edit
  newApprover: FormGroup;
  existingApprover: FormGroup;

  //alert
  sucess: boolean;
  deleted: boolean;
  updated: boolean;

  //selection: for newApprover form, selectedRole: for existingApprover form
  selected = '';
  selectedRole = '';

  //selection to pass id of each approver type (div, dept. head, etc)
  selectedDiv = '';
  selectedDeptHead = '';
  selectedAppCoord = '';
  selectedDeptInfo = '';

  roles: string[] = [
    'Division Chief Manager',
    'Department Head',
    'Application Coordinator',
    'Department Info Security Officer',
  ];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    //set the list in ngOnit
    this.getAllDivCheif();
    this.getAllDeptHead();
    this.getAllAppCoord();
    this.getAllDeptInfo();

    //set input values based on name selection
    this.setInput();

    //new approver formGroup
    this.newApprover = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z A-Z]*'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    //existing approver fromGroup
    this.existingApprover = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z A-Z]*'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  //get all list of each individual approver types
  getAllDivCheif(): void {
    this.adminService.getAllDivChief().subscribe((res) => {
      this.divChief = res;
    });
  }

  getAllDeptHead(): void {
    this.adminService.getAllDeptHead().subscribe((res) => {
      this.deptHead = res;
    });
  }

  getAllAppCoord(): void {
    this.adminService.getAllAppCoord().subscribe((res) => {
      this.appCoord = res;
    });
  }
  getAllDeptInfo(): void {
    this.adminService.getAllDeptInfoSec().subscribe((res) => {
      this.deptInfo = res;
    });
  }

  //set inputs(name, phone, email) based on name selection
  setInput(): void {
    if (this.selectedRole == this.roles[0]) {
      this.existingApprover.reset();
      if (this.selectedDiv) {
        this.adminService
          .getDivChief(Number(this.selectedDiv))
          .subscribe((res) => {
            this.existingApprover.get('id').setValue(res.id);
            this.existingApprover.get('name').setValue(res.name);
            this.existingApprover.get('phone').setValue(res.phone);
            this.existingApprover.get('email').setValue(res.email);
          });
      }
    } else if (this.selectedRole == this.roles[1]) {
      this.existingApprover.reset();
      if (this.selectedDeptHead) {
        this.adminService
          .getDeptHead(Number(this.selectedDeptHead))
          .subscribe((res) => {
            this.existingApprover.get('id').setValue(res.id);
            this.existingApprover.get('name').setValue(res.name);
            this.existingApprover.get('phone').setValue(res.phone);
            this.existingApprover.get('email').setValue(res.email);
          });
      }
    } else if (this.selectedRole == this.roles[2]) {
      this.existingApprover.reset();
      if (this.selectedAppCoord) {
        this.adminService
          .getAppCoord(Number(this.selectedAppCoord))
          .subscribe((res) => {
            this.existingApprover.get('id').setValue(res.id);
            this.existingApprover.get('name').setValue(res.name);
            this.existingApprover.get('phone').setValue(res.phone);
            this.existingApprover.get('email').setValue(res.email);
          });
      }
    } else if (this.selectedRole == this.roles[3]) {
      this.existingApprover.reset();
      if (this.selectedDeptInfo) {
        this.adminService
          .getDeptInfoSec(Number(this.selectedDeptInfo))
          .subscribe((res) => {
            this.existingApprover.get('id').setValue(res.id);
            this.existingApprover.get('name').setValue(res.name);
            this.existingApprover.get('phone').setValue(res.phone);
            this.existingApprover.get('email').setValue(res.email);
          });
      }
    }
  }

  // updateitem(id: number, objectArray: Array<any>, item: object) {
  //   let index = objectArray.findIndex(x => x.id == id);
  //   objectArray[index]= item
  // }

  //edit based on main selection and call patch request
  edit() {
    if (this.selectedRole == this.roles[0]) {
      if (this.selectedDiv) {
        this.adminService
          .patchDivChief(this.selectedDiv, this.existingApprover.value)
          .subscribe((res) => {
            let index = this.divChief.findIndex(x => x.id == this.selectedDiv);
            this.divChief[index] = res;
            this.getAllDivCheif();
            this.updated = true;
          });
      }
    } else if (this.selectedRole == this.roles[1]) {
      if (this.selectedDeptHead) {
        this.adminService
          .patchDeptHead(this.selectedDeptHead, this.existingApprover.value)
          .subscribe((res) => {
            let index = this.deptHead.findIndex(x => x.id == this.selectedDiv);
            this.deptHead[index] = res;
            this.getAllDeptHead();
            this.updated = true;
          });
      }
    } else if (this.selectedRole == this.roles[2]) {
      if (this.selectedAppCoord) {
        this.adminService
          .patchAppCoord(this.selectedAppCoord, this.existingApprover.value)
          .subscribe((res) => {
            let index = this.appCoord.findIndex(x => x.id == this.selectedDiv);
            this.appCoord[index] = res;
            this.getAllAppCoord();
            this.updated = true;
          });
      }
    } else if (this.selectedRole == this.roles[3]) {
      if (this.selectedDeptInfo) {
        this.adminService
          .patchDeptInfoSec(this.selectedDeptInfo, this.existingApprover.value)
          .subscribe((res) => {
            let index = this.deptInfo.findIndex(x => x.id == this.selectedDiv);
            this.deptInfo[index] = res;
            this.getAllDeptInfo();
            this.updated = true;
          });
      }
    }
  }

  removeApproverFromArray(id: number, objectArray: Array<any>) {
    objectArray = objectArray.filter(item => item.id != id);
  }

  //delete based on main selection and call delete request
   deleteSelection() {
    if (this.selectedRole == this.roles[0]) {
      if (this.selectedDiv) {
        this.adminService.deleteDivChief(this.selectedDiv).subscribe(async (res) => {
          this.removeApproverFromArray(Number(this.selectedDiv), this.divChief);
          this.getAllDivCheif();
          this.deleted = true;
        });
      }
    } else if (this.selectedRole == this.roles[1]) {
      if (this.selectedDeptHead) {
        this.adminService
          .deleteDeptHead(this.selectedDeptHead)
          .subscribe((res) => {
            this.removeApproverFromArray(Number(this.selectedDiv), this.deptHead);
            this.getAllDeptHead();
            this.deleted = true;
          });
      }
    } else if (this.selectedRole == this.roles[2]) {
      if (this.selectedAppCoord) {
        this.adminService
          .deleteAppCoord(this.selectedAppCoord)
          .subscribe((res) => {
            this.removeApproverFromArray(Number(this.selectedDiv), this.appCoord);
            this.getAllAppCoord();
            this.deleted = true;
          });
      }
    } else if (this.selectedRole == this.roles[3]) {
      if (this.selectedDeptInfo) {
        this.adminService
          .deleteDeptInfoSec(this.selectedDeptInfo)
          .subscribe((res) => {
            this.removeApproverFromArray(Number(this.selectedDiv), this.deptInfo);
            this.getAllDeptInfo();
            this.deleted = true;
          });
      }
    }
    this.existingApprover.reset();
  }

  //clear form inputs when switching tab
  clear(): void {
    this.newApprover.reset();
    this.existingApprover.reset();
    this.selected = '';
    this.selectedRole = '';
    this.selectedDiv = '';
    this.selectedDeptHead = '';
    this.selectedAppCoord = '';
    this.selectedDeptInfo = '';
    this.sucess = false;
    this.deleted = false;
    this.updated = false;

  }

  //based on selection: do http.post to individual approver type
  add(): void {
    if (this.selected == this.roles[0]) {
      this.adminService
        .postDivChief(this.newApprover.value)
        .subscribe((res) => {
          this.divChief.push(res);
          this.sucess = true;
        });
    } else if (this.selected == this.roles[1]) {
      this.adminService
        .postDeptHead(this.newApprover.value)
        .subscribe((res) => {
          this.deptHead.push(res);
          this.sucess = true;
        });
    } else if (this.selected == this.roles[2]) {
      this.adminService
        .postAppCoord(this.newApprover.value)
        .subscribe((res) => {
          this.appCoord.push(res);
          this.sucess = true;
        });
    } else if (this.selected == this.roles[3]) {
      this.adminService
        .postDeptInfoSec(this.newApprover.value)
        .subscribe((res) => {
          this.deptInfo.push(res);
          this.sucess = true;
        });
    }
  }
}

// changes the ErrorStateMatcher to include dirty
// removes the error message and red boxes after clicking next
class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}

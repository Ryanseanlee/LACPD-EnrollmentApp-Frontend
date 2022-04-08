import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  adminForm: FormGroup;
  hide1 = true;
  hide2 = true;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  message: string;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      middleName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password1: new FormControl('',[Validators.required]),
      password2: new FormControl('',[Validators.required]),
    });
  }


  addAdmin(): void{
    this.adminService
    .newAdmin(
      this.adminForm.get('firstName').value,
      this.adminForm.get('middleName').value,
      this.adminForm.get('lastName').value,
      this.adminForm.get('email').value,
      this.adminForm.get('password1').value
    ).subscribe(
      (res) => {
        alert("New admin has been created");
        this.message = 'It worked :D';
      },
      (error) =>{
        if (error.status === 403) {
          alert("Error");
          this.message = 'Error in form';
        }
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  // update passwords
  hide1 = true;
  hide2 = true;
  resetForm: FormGroup;
  oldPassword: string;
  newPassword: string;
  isSucess: boolean = false;
  isAlert: boolean = false;
  message: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  // reset password
  updatePassword(): void {
    this.adminService
      .resetPassword(
        this.resetForm.get('oldPassword').value,
        this.resetForm.get('newPassword').value
      )
      .subscribe(
        (res) => {
          this.adminService.setAdminCredentials(this.resetForm.get('newPassword').value);
          this.isSucess = true;
          this.message = 'Password reset successful!';
        },
        (error) => {
          if (error.status === 403) {
            this.isAlert = true;
            this.message = 'Invalid current password';
          }
        }
      );
    this.isSucess = false;
    this.isAlert = false;
  }
}

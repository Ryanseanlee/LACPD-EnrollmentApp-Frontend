import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-internet-access',
  templateUrl: './internet-access.component.html',
  styleUrls: ['./internet-access.component.css'],
})
export class InternetAccessComponent implements OnInit {
  // Functions from parent component (employee-form)
  @Input() printForm: () => void;
  @Input() save: () => void;
  @Input() form: FormGroup;

  //Registration Boolean Variables
  applyDefaultCountyWidePolicy: boolean;
  departmentPolicyRule0: boolean;
  departmentPolicyRule1: boolean;
  departmentPolicyRule2: boolean;
  departmentPolicyRule3: boolean;
  departmentPolicyRule4: boolean;
  socialNetworkingFacebook: boolean;
  socialNetworkingTwitter: boolean;
  socialNetworkingLinkedIn: boolean;

  constructor() {}

  ngOnInit(): void {
    // If continuing a form, we have to add value manually
    this.applyDefaultCountyWidePolicy = this.form.get([
      'internetAccess',
      'applyDefaultCountyWidePolicy',
    ]).value;

    this.departmentPolicyRule0 = this.form.get([
      'internetAccess',
      'departmentPolicyRule0',
    ]).value;

    this.departmentPolicyRule1 = this.form.get([
      'internetAccess',
      'departmentPolicyRule1',
    ]).value;

    this.departmentPolicyRule2 = this.form.get([
      'internetAccess',
      'departmentPolicyRule2',
    ]).value;

    this.departmentPolicyRule3 = this.form.get([
      'internetAccess',
      'departmentPolicyRule3',
    ]).value;

    this.departmentPolicyRule4 = this.form.get([
      'internetAccess',
      'departmentPolicyRule4',
    ]).value;

    this.socialNetworkingFacebook = this.form.get([
      'internetAccess',
      'socialNetworkingFacebook',
    ]).value;

    this.socialNetworkingTwitter = this.form.get([
      'internetAccess',
      'socialNetworkingTwitter',
    ]).value;

    this.socialNetworkingLinkedIn = this.form.get([
      'internetAccess',
      'socialNetworkingLinkedIn',
    ]).value;
  }

  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.form
      .get(['internetAccess', event.source.id])
      .setValue(this[event.source.id]);
  }
}

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
  countywidePolicyB: boolean;
  countyWidePolicyA: boolean;
  allWebmail: boolean;
  streamMedia: boolean;
  justification: string;

  constructor() {}

  ngOnInit(): void {
    // If continuing a form, we have to add value manually
    this.countyWidePolicyA = this.form.get([
      'internetAccess',
      'countyWidePolicyA',
    ]).value;

    this.countywidePolicyB = this.form.get([
      'internetAccess',
      'countywidePolicyB',
    ]).value;

    this.allWebmail = this.form.get([
      'internetAccess',
      'allWebmail',
    ]).value;

    this.streamMedia = this.form.get([
      'internetAccess',
      'streammedia',
    ]).value;
    this.justification = this.form.get([
      'internetAccess',
      'justification',
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

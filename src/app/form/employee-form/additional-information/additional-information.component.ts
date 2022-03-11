import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.css'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '400ms',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '400ms',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AdditionalInformationComponent implements OnInit {
  // Functions from parent component (employee-form)
  @Input() printForm: () => void;
  @Input() save: () => void;
  @Input() form: FormGroup;

  // These variable represent if the user wants access to these items
  
  laCountyGovAccess: boolean;
  lacMobileWifiAccess: boolean;
  o360Email: boolean;

  // Options will be used for the chips
  options = new Set();

  constructor() {}

  ngOnInit(): void {
    this.laCountyGovAccess = this.form.get([
      'additionalInformation',
      'laCountyGovAccess',
    ]).value;
    this.lacMobileWifiAccess = this.form.get([
      'additionalInformation',
      'lacMobileWifiAccess',
    ]).value;
    this.o360Email = this.form.get([
      'additionalInformation',
      'o360Email',
    ]).value;
  } // 854572

  /**
   * @description Updates the models in the component as well as the formgroup.
   * @param event This is the event that comes from the button. Contains information such as: checked
   * @param nameOfOption This is the name of the option to be added to the chiplist
   */
  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Update form group
    this.form
      .get(['additionalInformation', event.source.id])
      .setValue(this[event.source.id]);

    // This is the code for the chiplist
    // if (event.source.checked) {
    //   // Add to chiplist
    //   this.options.add(nameOfOption);
    // } else {
    //   // Remove from chiplist
    //   this.options.delete(nameOfOption);
    // }
  }

  // FOR TESTING PURPOSES
  sampleFunction(): void {
    console.log('La County Access: ', this.laCountyGovAccess);
    console.log('lacMobile: ', this.lacMobileWifiAccess);
    console.log('O360 E-mail', this.o360Email);
  }
}

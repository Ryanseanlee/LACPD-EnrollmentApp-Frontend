import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manager-information',
  templateUrl: './manager-information.component.html',
  styleUrls: ['./manager-information.component.css'],
})
export class ManagerInformationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() save;
  @Input() printForm;
  constructor() {}

  ngOnInit(): void {}
}

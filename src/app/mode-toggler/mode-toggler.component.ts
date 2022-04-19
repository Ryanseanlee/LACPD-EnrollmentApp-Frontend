import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mode-toggler',
  templateUrl: './mode-toggler.component.html',
  styleUrls: ['./mode-toggler.component.css']
})
export class ModeTogglerComponent implements OnInit {

  constructor() {
   }

  storedTheme: string = localStorage.getItem('theme-color');

  changeMode(){
    if(this.storedTheme === 'dark-mode'){
      localStorage.setItem('theme-color', 'light-mode');
      this.storedTheme = localStorage.getItem('theme-color');
    }else{
      localStorage.setItem('theme-color', 'dark-mode');
      this.storedTheme = localStorage.getItem('theme-color');
    }
  }

  ngOnInit(): void {
    this.changeMode();
  }

}

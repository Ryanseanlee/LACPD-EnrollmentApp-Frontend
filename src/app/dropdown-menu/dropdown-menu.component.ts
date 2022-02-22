import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent{

  opened = false;

  isButtonVisible = true;


  changeButton(): boolean {
    
    if(this.opened){
      return false;
    }else{
      return true;
    }
    
  }

}

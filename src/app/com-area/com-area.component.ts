import { Component } from '@angular/core';
import { InputComponent } from './../input/input.component';

@Component({
  selector: 'app-com-area',
  templateUrl: './com-area.component.html',
  styleUrls: ['./com-area.component.css'],
})
export class ComAreaComponent {
  
  inputComponent

  constructor(inputComponent: InputComponent) {
    inputComponent=this.inputComponent;
  }
  comments = this.inputComponent;

}

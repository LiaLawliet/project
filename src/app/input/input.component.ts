import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  inputs:['comments'],
  outputs:['newcomments'],
})
export class InputComponent {

  public comments = ['test'];
  public newcomments:EventEmitter = new EventEmitter();
  addComment(newComment: string) {
    if (newComment) {
      this.newcomments.next(this.comments.push(newComment));
    }
  }

}

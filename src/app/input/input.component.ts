import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  comments = [
    {
      sendDate: new Date(),
      message: 'test'
    }];
  addComment(newComment: string) {
    if (newComment) {
      this.comments.push({message: newComment,
                          sendDate: new Date()});
    }
  }

}

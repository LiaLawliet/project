import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CommentService]
})
export class InputComponent implements OnInit {

  public comments = [];

  constructor(private _commentService: CommentService){}
  addComment(newComment: string) {
    newComment = newComment.trim();
    if (newComment) {
      this.comments.push({message: newComment,
                          date: new Date()
      })
    }
    /*this._commentService.insertComment().subscribe(comment => { this.comments.push(comment);
      });
      console.log('OKOKOKOKO');*/
  }

  ngOnInit(){
    /*this._commentService.getAllComments().subscribe( data => this.comments = data);*/
  }

}

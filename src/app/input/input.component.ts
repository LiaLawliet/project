import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommentService } from './comment.service'
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CommentService]
})
export class InputComponent implements OnInit {

  public comments = [];

  constructor(private _commentService: CommentService, private _authService: AuthService, private router: Router) { }

  addComment(newComment: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let idPlus = this.getId();
      newComment = newComment.trim();
      if (newComment) {

let comments=this.comments
        this._commentService.insertComment({ id: idPlus, message: newComment, date: new Date() }).subscribe(function () {
          comments.push({
            message: newComment,
            date: new Date(),
            id: idPlus
          })
          console.log('OKOKOKOKO');

        });
      }
    }
  }

  getId() {
    if (this.comments.length != 0) {
      return this.comments.reduce((max, p) => p.id > max ? p.id : max, this.comments[0].id) + 1;
    } else {
      return 0;
    }
  }

  delComment(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._commentService.deleteComment(id).subscribe(() => {
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id == id) {
            this.comments.splice(i, 1);
            break;
          }
        }
        console.log("success");
      });
    }
  }

  ngOnInit() {
    this._commentService.getAllComments().subscribe(data => this.comments = data);
  }
}

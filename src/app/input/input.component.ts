import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommentService } from './comment.service'
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CommentService]
})
export class InputComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _commentService: CommentService,
    private _authService: AuthService,
    private router: Router,
    public modal: NgxSmartModalService) { }


  //public pageID = parseInt(this.params.get('id'));
  public allComments = [];
  public comments = [];
  public sender = parseInt(this._authService.getUserID);
  public isAdmin = this._authService.getUserType;


  addComment(newComment: string) {
    let success = false;
    console.log(this.sender);
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let idPlus = this.getId();
      newComment = newComment.trim();

      if (newComment) {
        let comments = this.comments
        let allComments = this.allComments
        let auth = this._authService
        let senderid=this.sender
        this.route.paramMap.pipe(
          switchMap((params: ParamMap) =>
            this._commentService.insertComment(parseInt(params.get('id')), { id: idPlus, sender_id: this.sender, sujet_id: parseInt(params.get('id')), message: newComment, date: new Date() })
          )).subscribe(function (data) {
            success = true;
            console.log(data);
            comments.push({
              id: idPlus,
              sujet_id: null,
              sender_id:senderid,
              message: newComment,
              date: new Date(),
              username: auth.getUser
            })
            allComments.push({
              id: idPlus,
              sujet_id: null,
              sender_id:senderid,
              message: newComment,
              date: new Date(),
              username: auth.getUser
            })
            console.log('OKOKOKOKO');

          });
      }
    }
  }

  getId() {
    if (this.allComments.length != 0) {
      return this.allComments.reduce((max, p) => p.id > max ? p.id : max, this.allComments[0].id) + 1;
    } else {
      return 0;
    }
  }

  openDelModal(id) {
    this.modal.resetModalData('delModal')
    console.log(id)
    this.modal.setModalData(id, 'delModal');
    this.modal.getModal('delModal').open();
  }

  openPutModal(id, message) {
    let obj: Object = {
      'id': id,
      'message': message
    }
    this.modal.resetModalData('putModal')
    this.modal.setModalData(obj, 'putModal');
    this.modal.getModal('putModal').open();
  }

  delComment(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._commentService.deleteComment(id).subscribe(() => {
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id == id) {
            this.comments.splice(i, 1);
          }
        }
        this.modal.getModal('delModal').close();

        console.log("success");
      });

    }
  }


  putComment(id: number, message: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log(message,id)
      this._commentService.updateComment(id, message).subscribe(() => {
       
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id == id) {
            this.comments[i].message = message;
            break;
          }
        }
        this.modal.getModal('putModal').close();

        console.log("success");
      });

    }
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._commentService.getComments(parseInt(params.get('id'))))
    ).subscribe(data => this.comments = data);

    this._commentService.getAllComments().subscribe(data => this.allComments = data);
  }
}

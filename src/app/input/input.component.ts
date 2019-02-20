import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommentService } from '../services/comment.service'
import { SujetService } from '../services/sujet.service'
import { ChatService } from '../services/chat.service'
import { MailService } from '../services/mail.service'
import { switchMap } from 'rxjs/operators';
import { ThemeService } from '../services/theme.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Sujet } from '../services/sujet';
import * as $ from 'jquery';
import * as io from 'socket.io-client';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css'],
	providers: [CommentService, SujetService,ChatService]
})
export class InputComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private _themeService: ThemeService,
		private _commentService: CommentService,
		private chatService: ChatService,
		private _mailService: MailService,
		private _authService: AuthService,
		private _sujetService: SujetService,
		private router: Router,
		public modal: NgxSmartModalService) {			
			//this.socket.on('chat',function(data){$('.card-body').append("<div class='card-block' id='"+data.id+"'><div class='inline-block imgSujet' style='width:20%;text-align: center'><img class='sujetImg rounded-circle' style='width: 75px;height: 75px;' alt='User Image' src='http://localhost:8000/public/uploads/"+data.image+"'><br><span>"+data.username+"</span></div><div class='inline-block' style='width:60%'><div class='message' >"+data.message+"</div><p style='font-size: 10px'>Envoyé le "+data.date+" "+data.id+"</p></div><div class='inline-block' style='width:20%;text-align: center;'><span *ngIf='comment.sender_id == loggedUser || _authService.getUserType == '1'' (click)='openDelModal(comment.id)' style='font-size:20px;color:red; margin-right: 5px'><i class='icon-trash-o'></i></span><span *ngIf='"+data.sender_id+" == loggedUser' (click)='openPutModal("+data.id+","+data.message+")' style='font-size:20px;color:rgb(32, 62, 192); margin-left: 5px'><i class='icon-edit2'></i></span></div></div>")})
			let comments;
			this._commentService.getComments(parseInt(this.param)).subscribe(data => {
				this.comments = data;
				comments = this.comments;
				if (comments.length != 0) {
					$('.empty').hide()
				}else{
					$('.empty').show()
				}
				console.log(this.comments)
				console.log(comments)
				this.chatService.joinRoom({user:this._authService.getUser, room:parseInt(this.param)})
			});
			this.chatService.newMessageReceived()
        	.subscribe(data=>{
				this.comments.push(data);
				$('.empty').hide()
			});
		}


	//public pageID = parseInt(this.params.get('id'));
	public allComments = [];
	public param = this.route.snapshot.paramMap.get('id');
	public sujet;
	public themeSujet;
	private allSujets = [];
	private allThemes = [];
	public comments = [];
	public sender = parseInt(this._authService.getUserID);
	public isAdmin = this._authService.getUserType;
	public loggedUser = parseInt(this._authService.getUserID);


	addComment(newComment: string) {
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
				let senderid = this.sender
				let date = new Date();
				this._commentService.insertComment(this.sender, parseInt(this.param), newComment, date)
				.subscribe(() => {
					this.chatService.sendMessage(parseInt(this.param),{
						id: idPlus,
						sender_id : senderid,
						sujet_id: parseInt(this.param),
						message: newComment,
						date: date,
						username: auth.getUser,
						image: auth.getUserImage
					})
				});
			}
		}
	}

	getId() {
		this._commentService.getAllComments().subscribe(data => this.allComments = data);
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
		}else{
			console.log(message, id)
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

	clearSujet() {
		this._sujetService.resolveSujet(this.sujet[0].id, 1).subscribe(() => {
			this.modal.getModal('clearModal').close();
			location.reload();
			console.log("success");
		});
	}

	onTimeOut() {
		this._commentService.getComments(parseInt(this.param)).subscribe(data => {
			this.comments = data;
			let comments = this.comments;
			if (comments.length != 0) {
				$('.empty').hide()
			}else{
				$('.empty').show()
			}
		});
	}

	ngOnInit() {
		$('body').css('background','none')
    	$('body').css('background-color','#F3F3F3')
		this._sujetService.getAllSujets().subscribe(data => {
			this.allSujets = data;
			console.log(this.allSujets)

			let allsujets = this.allSujets
			let sujet = allsujets.find(item => item.id == parseInt(this.param))
			console.log(sujet)
			$(".sujet_name").append(sujet.sujet_name)
			if (sujet['resolu'] == 1 || sujet['creator'] != this.loggedUser) {
				$(".resoudre").css('display','none');
			}

			if (sujet.hidden == 1) {
				this.router.navigate(['home'])
			}
			this._themeService.getAllThemes().subscribe(data => {

				this.allThemes = data
	
				let allThemes = this.allThemes
				let theme = allThemes.find(item => item.id == sujet.theme_id)
				$(".themeSujet").append(theme.theme_name)
	
				if (theme.hidden == 1) {
					this.router.navigate(['home'])
				}
			});
		});

		this._commentService.getAllComments().subscribe(data => this.allComments = data);

		
	}
}

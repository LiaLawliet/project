import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SujetService } from '../services/sujet.service';
import { ThemeService } from '../services/theme.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';
import { QrService } from '../services/qr.service';
import * as $ from 'jquery';


@Component({
	selector: 'app-sujet',
	templateUrl: './sujet.component.html',
	styleUrls: ['./sujet.component.css'],
	providers: [SujetService, QrService, ThemeService]
})

export class SujetComponent implements OnInit {

	public param = this.route.snapshot.paramMap.get('id');
	public sujets = [];
	public nbComments = [];
	private themes = [];
	private allThemes = [];
	public qrs = [];
	public theme = [];

	constructor(private _sujetService: SujetService,
		private _qrService: QrService,
		private route: ActivatedRoute,
		private router: Router,
		private _themeService: ThemeService,
		private _authService: AuthService,
		private modal: NgxSmartModalService) { }


	gotoHome() {
		this.router.navigate(['home'])
	}

	openAddModal() {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		}else{
			let obj: Object = {
				'theme_id': parseInt(this.param)
			}
			this.modal.resetModalData('addModal')
			this.modal.setModalData(obj, 'addModal');
			this.modal.getModal('addModal').open();
		}
	}


	addSujet(theme_id: number, sujet_name: string) {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		} else {
			let sujets = this.sujets
			let auth = this._authService
			let themes = this.themes
			let theme = themes.find(item => item.id == theme_id)
			let param = this.param
			this._sujetService.insertSujet(theme_id, sujet_name, theme.hidden, parseInt(auth.getUserID)).subscribe(function (data) {
				this._sujetService.getSujets(parseInt(this.param)).subscribe(data => {
				this.sujets = data,
					console.log(this.sujets), console.log("success");
				});
			});
			this.modal.getModal('addModal').close();
		}
	}


	ngOnInit() {
		$('body').css('background','none')
    	$('body').css('background-color','#F3F3F3')
		console.log(this.param)

		this._sujetService.getForumNbCom().subscribe(data => {
		this.nbComments = data,console.log(this.nbComments)
		});

		this._themeService.getThemes().subscribe(data => {
		this.themes = data
		});

		this._themeService.getAllThemes().subscribe(data => {

			this.allThemes = data

			let allThemes = this.allThemes
			let theme = allThemes.find(item => item.id == this.param)
			this.theme = theme;

			if (theme.hidden == 1) {
				this.router.navigate(['home'])
			}
		});


		this._sujetService.getSujets(parseInt(this.param)).subscribe(data => {
		this.sujets = data,
			console.log(this.sujets)
		});

		this._qrService.getQrs(parseInt(this.param)).subscribe(data => this.qrs = data);

		$(document).ready(function () {
			$("#myInput").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$(".searchForum").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
				$("h5").filter(function () {
					$(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});

			$("#myInput2").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$(".searchFaq").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
				$("h5").filter(function () {
					$(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
	}

	gotoInputs(id) {
		this.router.navigate(['sujet/' + id]);
	}
}


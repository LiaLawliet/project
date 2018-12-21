import { Component, OnInit } from '@angular/core';
import { SujetService } from '../services/sujet.service';
import { ThemeService } from '../services/theme.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-putsujets',
	templateUrl: './putsujets.component.html',
	styleUrls: ['./putsujets.component.css'],
	providers: [SujetService, ThemeService]
})
export class PutsujetsComponent implements OnInit {

	constructor(private _sujetService: SujetService,
		private _themeService: ThemeService,
		private router: Router,
		public modal: NgxSmartModalService,
		private _authService: AuthService) { }

	private sujets = [];
	private themes = [];
	public isAdmin = this._authService.getUserType;

	gotoHome() {
		this.router.navigate(['home'])
	}

	gotoAdmin() {
		this.router.navigate(['admin'])
	}

	openAddModal() {
		this.modal.getModal('addModal').open();
	}

	openPutModal(id, theme_id, sujet_name) {
		let obj: Object = {
			'id': id,
			'theme_id': theme_id,
			'sujet_name': sujet_name
		}
		this.modal.resetModalData('putModal')
		this.modal.setModalData(obj, 'putModal');
		this.modal.getModal('putModal').open();
	}

	openShowModal(id) {
		let obj: Object = {
			'id': id
		}
		this.modal.resetModalData('showModal')
		this.modal.setModalData(obj, 'showModal');
		this.modal.getModal('showModal').open();
	}

	openHideModal(id) {
		let obj: Object = {
			'id': id
		}
		this.modal.resetModalData('hideModal')
		this.modal.setModalData(obj, 'hideModal');
		this.modal.getModal('hideModal').open();
	}

	addSujet(theme_id: number, sujet_name: string) {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		} else {
			let auth = this._authService
			let sujets = this.sujets
			let themes = this.themes
			let theme = themes.find(item => item.id == theme_id)
			let idPlus = this.getId();
			this._sujetService.insertSujet(theme_id, sujet_name, theme.hidden, parseInt(auth.getUserID)).subscribe(function (data) {
				console.log(data);
				sujets.push({
					id: idPlus,
					sujet_name: sujet_name,
					theme_name: theme.theme_name,
					resolu: 0,
					username: auth.getUser,
					hidden: theme.hidden
				})
				console.log("success");
			});
			this.modal.getModal('addModal').close();
		}
	}

	putSujet(id: number, theme_id: number, sujet_name: string) {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		} else {
			console.log()
			let theme = this.themes.find(item => item.id == theme_id)
			this._sujetService.updateSujet(id, theme_id, sujet_name, theme.hidden).subscribe(() => {

				for (var i = 0; i < this.sujets.length; i++) {
					if (this.sujets[i].id == id) {
						this.sujets[i].theme_name = theme.theme_name;
						this.sujets[i].sujet_name = sujet_name;
						this.sujets[i].hidden = theme.hidden;
					}
				}
				this.modal.getModal('putModal').close();

				console.log("success");
			});

		}
	}

	showSujet(id: number) {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		} else {
			this._sujetService.revealSujet(id).subscribe(() => {
				for (var i = 0; i < this.sujets.length; i++) {
					if (this.sujets[i].id == id) {
						this.sujets[i].hidden = 0;
					}
				}
				this.modal.getModal('showModal').close();

				console.log('Sujets modifiés');
			});

		}
	}

	hideSujet(id: number) {
		if (this._authService.loggedOut) {
			this.router.navigate(['login'])
		} else {
			console.log()
			this._sujetService.deleteSujet(id).subscribe(() => {
				for (var i = 0; i < this.sujets.length; i++) {
					if (this.sujets[i].id == id) {
						this.sujets[i].hidden = 1;
					}
				}
				this.modal.getModal('hideModal').close();

				console.log('Sujet modifié');
			})
		}
	}

	getId() {
		if (this.sujets.length != 0) {
			return this.sujets.reduce((max, p) => p.id > max ? p.id : max, this.sujets[0].id) + 1;
		} else {
			return 0;
		}
	}

	ngOnInit() {
		$('body').css('background', 'none')
		$('body').css('background-color', '#F3F3F3')
		if (this.isAdmin != '1') {
			this.router.navigate(['home'])
		}

		this._sujetService.getPutSujets().subscribe(data => {
		this.sujets = data
			console.log(this.sujets);
		});

		this._themeService.getAllThemes().subscribe(data => {
		this.themes = data
			console.log(this.themes)
		});

		$(document).ready(function () {
			$("#myInput").on("keyup", function () {
				var value = $(this).val().toLowerCase();
				$(".elSujet").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
	}

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../../dialog/change-password-dialog/change-password-dialog.component';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin-menu',
  templateUrl: './sidebar-admin-menu.component.html',
  styleUrls: ['./sidebar-admin-menu.component.css']
})
export class SidebarAdminMenuComponent implements OnInit {

  isSidebarOpen= false;

  user = {
    nome: '',
    cognome: '',
    ruolo: 'string',
    email: 'string',
    password: 'string'
  };

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {

    try {
      let response = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response.data;
    } 
    catch (err) {
      console.log(err);
    }

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem("ruolo");
  }

  goToHomeAdmin() {
    this.router.navigateByUrl('/home-admin');
  }

  goToRegistrazioneAdmin() {
    this.router.navigateByUrl('/registrazione-admin');
  }

  goToOrdineAdmin() {
    this.router.navigateByUrl('/ordine-admin');
  }

  goToUserAdmin() {
    this.router.navigateByUrl('/user-admin');
  }

  goToAccessiAdmin() {
    this.router.navigateByUrl('/accessi-admin');
  }

  goToRichiesteAdmin() {
    this.router.navigateByUrl('/richieste-admin');
  }
  
  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}

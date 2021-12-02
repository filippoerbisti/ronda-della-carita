import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import axios from 'axios';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= false;

  user = {
    nome: '',
    cognome: '',
    ruolo: 'string',
    email: 'string',
    password: 'string'
  };

  ruolo!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {
    this.ruolo = localStorage["ruolo"];
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

  goToHome() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/home-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/home-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToRegistrazione() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/registrazione-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-registrazione-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToOrdine() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/ordine-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-ordine-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  openMansionDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
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

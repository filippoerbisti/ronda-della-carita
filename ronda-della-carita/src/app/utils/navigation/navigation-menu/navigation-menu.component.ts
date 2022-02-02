import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import axios from 'axios';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  ruolo!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.ruolo = localStorage["ruolo"];
  }

  
  goToLogin() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem("ruolo");
  }

  goToHome() {
    if (this.ruolo === "admin") {
      this.router.navigateByUrl('/home-admin');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/home-esterno');
    } else if (this.ruolo === "interno") {
      this.router.navigateByUrl('/home-interno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToRichieste() {
    if (this.ruolo === "admin") {
      this.router.navigateByUrl('/home-admin');
    }
  }

  goToStorico() {
    if (this.ruolo === "admin") {
      this.router.navigateByUrl('/accessi-admin');
    }
  }

  goToUser() {
    this.router.navigateByUrl('/user-admin');
  }

  goToRegistrazione() {
    if (this.ruolo === "admin") {
      this.router.navigateByUrl('/registrazione-admin');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-registrazione-esterno');
    } else if (this.ruolo === "interno") {
      this.router.navigateByUrl('/registrazione-interno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToOrdine() {
    if (this.ruolo === "admin") {
      this.router.navigateByUrl('/ordine-admin');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-ordine-esterno');
    } else if (this.ruolo === "interno") {
      this.router.navigateByUrl('/ordine-interno');
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

}

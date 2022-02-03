import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  ruolo!: string;

  ruolo1 = 'volontario';
  ruolo11 = 'admin';

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
    this.router.navigateByUrl('/home');
  }

  goToConfirm() {
    this.router.navigateByUrl('/home');
  }

  goToHistory() {
    this.router.navigateByUrl('/accessi');
  }

  goToCreateUser() {
    this.router.navigateByUrl('/create-user');
  }

  goToCreateClient() {
    this.router.navigateByUrl('/create-client');
  }

  goToCreateOrder() {
    this.router.navigateByUrl('/create-order');
  }

  openMansionDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

}

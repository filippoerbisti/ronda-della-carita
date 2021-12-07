import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-navigation-admin-menu',
  templateUrl: './navigation-admin-menu.component.html',
  styleUrls: ['./navigation-admin-menu.component.css']
})
export class NavigationAdminMenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    this.router.navigateByUrl('/home-admin');
  }

  goToRichieste() {
    this.router.navigateByUrl('/home-admin');
  }

  goToStorico() {
    this.router.navigateByUrl('/accessi-admin');
  }

  goToUser() {
    this.router.navigateByUrl('/user-admin');
  }

  goToOrdine() {
    this.router.navigateByUrl('/ordine-admin');
  }

  goToRegistrazione() {
    this.router.navigateByUrl('/registrazione-admin');
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

}

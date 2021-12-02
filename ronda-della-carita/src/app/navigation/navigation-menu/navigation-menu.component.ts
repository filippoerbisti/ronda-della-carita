import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../dialog/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  goToHomeEsterno() {
    this.router.navigateByUrl('/home-esterno');
  }

  openMansionDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

  goToViewRegistrazioneEsterno() {
    this.router.navigateByUrl('/view-registrazione-esterno');
  }

  goToViewOrdineEsterno() {
    this.router.navigateByUrl('/view-ordine-esterno');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem("ruolo");
  }

}

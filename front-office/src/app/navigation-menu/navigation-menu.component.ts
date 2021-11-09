import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../change-mansion-dialog/change-mansion-dialog.component';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../change-mansion-dialog/change-mansion-dialog.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}

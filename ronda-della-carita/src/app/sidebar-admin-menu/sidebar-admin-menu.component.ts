import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import axios from 'axios';

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

  constructor(public dialog: MatDialog) { }

  async ngOnInit() {

    try {
      let response = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response.data;
    } 
    catch (err) {
      console.log(err);
    }

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

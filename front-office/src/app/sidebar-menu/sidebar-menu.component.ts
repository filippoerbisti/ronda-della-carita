import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../change-mansion-dialog/change-mansion-dialog.component';
import axios from 'axios';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= true;

  user = {
    nome: '',
    cognome: '',
    ruolo: 'string',
    interno: 'boolean',
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

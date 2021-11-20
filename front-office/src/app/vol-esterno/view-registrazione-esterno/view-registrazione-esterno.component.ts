import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from 'src/app/edit-client-dialog/edit-client-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';
import { IClient } from 'src/app/shared/interface/iclient';

@Component({
  selector: 'app-view-registrazione-esterno',
  templateUrl: './view-registrazione-esterno.component.html',
  styleUrls: ['./view-registrazione-esterno.component.css']
})
export class ViewRegistrazioneEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  clients: IClient[] = [];

  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20];

  searchClient!: string;

  constructor(public dialog: MatDialog) { 

  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/clients");
      console.log(response.status);
      console.log(response.data);
      this.clients = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageClientSlice = this.clients.slice(0, 10);
  }

  async filterClient() {
    let search = this.searchClient;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/clients/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.clients = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageClientSlice = this.clients.slice(0, 10); 
  }

  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.clients.length) {
      endIndex = this.clients.length;
    }
    this.pageClientSlice = this.clients.slice(startIndex, endIndex);
  }

  openDeleteClientDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openEditClientDialog() {
    const dialogRef = this.dialog.open(EditClientDialogComponent);
  }
}

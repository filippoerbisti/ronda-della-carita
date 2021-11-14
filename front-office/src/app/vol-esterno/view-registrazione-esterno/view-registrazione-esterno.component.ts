import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from '../../delete-client-dialog/delete-client-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';

interface Client{
  id: number,
  nome: string,
  cognome: string,
  genere: string,
  n_documento: string,
  t_documento: string,
  nazionalita: string,
  t_maglietta: string,
  t_pantaloni: string,
  t_scarpe: number,
  note: string,
  //created_at: timestamp,
  //update_at: timestamp
}

@Component({
  selector: 'app-view-registrazione-esterno',
  templateUrl: './view-registrazione-esterno.component.html',
  styleUrls: ['./view-registrazione-esterno.component.css']
})
export class ViewRegistrazioneEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  clients: Client[] = [];

  pageClientSlice = this.clients.slice(0, 5);
  pageSizeOptions: number[] = [5, 10, 20];

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
    this.pageClientSlice = this.clients.slice(0, 5);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
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
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from '../../delete-client-dialog/delete-client-dialog.component';
import axios from "axios";

@Component({
  selector: 'app-view-registrazione-esterno',
  templateUrl: './view-registrazione-esterno.component.html',
  styleUrls: ['./view-registrazione-esterno.component.css']
})
export class ViewRegistrazioneEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  clients = [{
    id: 'integer',
    nome: 'string',
    cognome: 'string',
    genere: 'char',
    n_documento: 'string',
    t_documento: 'string',
    nazionalita: 'string',
    t_maglietta: 'string',
    t_pantaloni: 'string',
    t_scarpe: 'integer',
    note: 'string',
    created_at: 'timestamp',
    update_at: 'timestamp'
  }];

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
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }
}

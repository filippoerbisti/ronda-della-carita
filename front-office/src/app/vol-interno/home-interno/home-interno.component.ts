import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';

interface User{
  id: number,
  nome: string,
  cognome: string,
  ruolo: string,
  interno: boolean,
  email: string,
  //email_verified_at: timestamp,
  password: string,
  remember_token: string,
  //created_at: timestamp,
  //update_at: timestamp
};

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

interface Order{
  id: number,
  n_ordine: number,
  p_ritiro: string
  genere: string,
  t_vestiario: string,
  taglia: string,
  quantita: number,
  status: string,
  note: string,
  //created_at: 'timestamp',
  //update_at: 'timestamp'
}

interface Card {
  id: number,
  n_tessera: string,
  //created_at: timestamp,
  //update_at: timestramp
}

@Component({
  selector: 'app-home-interno',
  templateUrl: './home-interno.component.html',
  styleUrls: ['./home-interno.component.css']
})
export class HomeInternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  users: User[] = [];
  clients: Client[] = [];
  orders: Order[] = [];
  cards: Card[] = [];

  lowValue = 0;
  highValue = 20;
  
  constructor(public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/user");
      console.log(response.status);
      console.log(response.data);
      this.users = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/clients");
      console.log(response.status);
      console.log(response.data);
      this.clients = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/orders");
      console.log(response.status);
      console.log(response.data);
      this.orders = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  openDeleteClientDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  
}

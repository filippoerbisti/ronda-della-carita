import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';

interface User {
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
  //update_at: timestamp,
  user_id: number,
  user?: User
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
  //update_at: 'timestamp',
  client_id: number,
  client?: Client,
  user_id: number,
  user?: User
}

interface Card {
  id: number,
  n_tessera: string,
  //created_at: timestamp,
  //update_at: timestramp,
  client_id: number,
  client?: Client,
  user_id: number,
  user?: User
}

interface Stato {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-interno',
  templateUrl: './home-interno.component.html',
  styleUrls: ['./home-interno.component.css']
})
export class HomeInternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  sordines: Stato[] = [
    {value: '', viewValue: 'Tutti'},
    {value: 'non_disponibile', viewValue: 'Non disponibile'},
    {value: 'in_attesa', viewValue: 'In attesa'},
    {value: 'consegnato', viewValue: 'Consegnato'},
  ];

  user: User[] = [];
  clients: Client[] = [];
  orders: Order[] = [];
  cards: Card[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  selectedStatus!: string;
  
  constructor(public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      console.log(response_user.status);
      console.log(response_user.data);
      this.user = response_user.data;

      let response_client = await axios.get("http://127.0.0.1:8000/api/clients");
      console.log(response_client.status);
      console.log(response_client.data);
      this.clients = response_client.data;

      let response_order = await axios.get("http://127.0.0.1:8000/api/orders");
      console.log(response_order.status);
      console.log(response_order.data);
      this.orders = response_order.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageOrderSlice = this.orders.slice(0, 10); 
    this.pageClientSlice = this.clients.slice(0, 10);

    this.orders = this.orders.filter(
      order => order.status === this.selectedStatus
    );
  }

  public valueSelected() {
    this.orders = this.orders.filter(
      order => order.status === this.selectedStatus
    );
  }

  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.orders.length) {
      endIndex = this.orders.length;
    }
    this.pageOrderSlice = this.orders.slice(startIndex, endIndex); 

    if (endIndex > this.clients.length) {
      endIndex = this.clients.length;
    }
    this.pageClientSlice = this.clients.slice(startIndex, endIndex);
  }  

  openDeleteClientDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';
import { EditOrderDialogComponent } from 'src/app/edit-order-dialog/edit-order-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';

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
  user1?: User
}

@Component({
  selector: 'app-view-ordine-esterno',
  templateUrl: './view-ordine-esterno.component.html',
  styleUrls: ['./view-ordine-esterno.component.css']
})
export class ViewOrdineEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  user: User[] = [];
  clients: Client[] = [];
  orders: Order[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20];

  searchOrder!: string;

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
  }

  async filterOrder() {
    let search = this.searchOrder;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/orders/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.orders = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageOrderSlice = this.orders.slice(0, 10); 
  }

  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.orders.length) {
      endIndex = this.orders.length;
    }
    this.pageOrderSlice = this.orders.slice(startIndex, endIndex);
  }

  openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  openEditOrderDialog() {
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
  }

}

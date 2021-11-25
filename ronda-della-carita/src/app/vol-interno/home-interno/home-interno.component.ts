import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';
import { EditClientDialogComponent } from 'src/app/edit-client-dialog/edit-client-dialog.component';
import { EditOrderDialogComponent } from 'src/app/edit-order-dialog/edit-order-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import { IClient } from 'src/app/shared/interface/iclient';
import { IOrder } from 'src/app/shared/interface/iorder';
import { ICard } from 'src/app/shared/interface/icard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-interno',
  templateUrl: './home-interno.component.html',
  styleUrls: ['./home-interno.component.css']
})
export class HomeInternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  sordines = [
    '',
    'Non disponibile',
    'In attesa',
    'Consegnato'
  ];

  user: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  cards: ICard[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  state!: string;
  searchOrder!: string;
  searchClient!: string;
  orderNonDisp!: number;
  orderInAttesa!: number;
  
  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}

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

      let response_order_nondisp = await axios.get("http://127.0.0.1:8000/api/orders/nondisp");
      console.log(response_order_nondisp.status);
      console.log(response_order_nondisp.data);
      this.orderNonDisp = response_order_nondisp.data;

      let response_order_inattesa = await axios.get("http://127.0.0.1:8000/api/orders/inattesa");
      console.log(response_order_inattesa.status);
      console.log(response_order_inattesa.data);
      this.orderInAttesa = response_order_inattesa.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageOrderSlice = this.orders.slice(0, 10); 
    this.pageClientSlice = this.clients.slice(0, 10);
  }  

  goToRegistrazioneInterno() {
    this.router.navigateByUrl('/registrazione-interno');
  }

  goToOrdineInterno() {
    this.router.navigateByUrl('/ordine-interno');
  }

  OnPageChange(event: PageEvent) {
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
  async filterOrder() {
    let search = this.searchOrder;
    let status = this.state;
    if(status==""){
      status="all";
    }
    status=JSON.stringify(status);
    console.log(status);
    console.log(search);
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/orders/filt/"+status);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.orders = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageOrderSlice = this.orders.slice(0, 10); 
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

  openDeleteClientDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  openEditOrderDialog() {
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
  }

  openEditClientDialog() {
    const dialogRef = this.dialog.open(EditClientDialogComponent);
  }
}

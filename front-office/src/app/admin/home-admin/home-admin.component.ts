import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/delete-user-dialog/delete-user-dialog.component';
import { EditClientDialogComponent } from 'src/app/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from 'src/app/edit-user-dialog/edit-user-dialog.component';
import { EditOrderDialogComponent } from 'src/app/edit-order-dialog/edit-order-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import { IOrder } from 'src/app/shared/interface/iorder';
import { ICard } from 'src/app/shared/interface/icard';
import { IClient } from 'src/app/shared/interface/iclient';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  sordines = [
    '',
    'Non disponibile',
    'In attesa',
    'Consegnato'
  ];

  users: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  cards: ICard[] = [];

  pageUserSlice = this.users.slice(0, 10);
  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  searchUser!: string;
  state!: string;
  searchOrder!: string;
  searchClient!: string;
  orderNonDisp!: string;
  orderInAttesa!: string;
  
  constructor(
    public dialog: MatDialog,
    private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/users");
      console.log(response_user.status);
      console.log(response_user.data);
      this.users = response_user.data;

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
    this.pageUserSlice = this.users.slice(0, 10); 
    this.pageOrderSlice = this.orders.slice(0, 10); 
    this.pageClientSlice = this.clients.slice(0, 10);
  }  

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) {
      endIndex = this.users.length;
    }
    this.pageUserSlice = this.users.slice(startIndex, endIndex);

    if (endIndex > this.orders.length) {
      endIndex = this.orders.length;
    }
    this.pageOrderSlice = this.orders.slice(startIndex, endIndex); 

    if (endIndex > this.clients.length) {
      endIndex = this.clients.length;
    }
    this.pageClientSlice = this.clients.slice(startIndex, endIndex);
  }  

  async filterUser() {
    let search = this.searchUser;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/users/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.users = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageUserSlice = this.users.slice(0, 10); 
  }

  async filterOrder() {
    let search = this.searchOrder;
    let status = this.state;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/orders/" + search + status);
      console.log(response_filter.status);
      console.log(response_filter.data);
      console.log(status);
      console.log(search);
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

  openDeleteUserDialog() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    // this.router.navigate(['/user/delete', { id: userId }]);
  }

  openDeleteClientDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  openEditUserDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent);
  }

  openEditOrderDialog() {
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
  }

  openEditClientDialog() {
    const dialogRef = this.dialog.open(EditClientDialogComponent);
  }
}

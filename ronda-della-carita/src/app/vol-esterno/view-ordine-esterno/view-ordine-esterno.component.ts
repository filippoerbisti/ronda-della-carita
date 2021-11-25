import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from 'src/app/delete-order-dialog/delete-order-dialog.component';
import { EditOrderDialogComponent } from 'src/app/edit-order-dialog/edit-order-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';
import { IUser } from 'src/app/shared/interface/iuser';
import { IClient } from 'src/app/shared/interface/iclient';
import { IOrder } from 'src/app/shared/interface/iorder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-ordine-esterno',
  templateUrl: './view-ordine-esterno.component.html',
  styleUrls: ['./view-ordine-esterno.component.css']
})
export class ViewOrdineEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  user: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20];

  searchOrder!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

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

  goToOrdineEsterno() {
    this.router.navigateByUrl('/ordine-esterno');
  }

  goToHomeEsterno() {
    this.router.navigateByUrl('/home-esterno');
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

  openDeleteOrderDialog(orderId: number) {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
    console.log(orderId);
  }

  openEditOrderDialog(orderId: number) {
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
    console.log(orderId);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from 'src/app/dialog/order/delete-order-dialog/delete-order-dialog.component';
import { EditOrderDialogComponent } from 'src/app/dialog/order/edit-order-dialog/edit-order-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';
import { IUser } from 'src/app/shared/interface/iuser';
import { IClient } from 'src/app/shared/interface/iclient';
import { IOrder } from 'src/app/shared/interface/iorder';
import { IParam } from 'src/app/shared/interface/iparam';
import { IClothe } from 'src/app/shared/interface/iclothe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-ordine-esterno',
  templateUrl: './view-ordine-esterno.component.html',
  styleUrls: ['./view-ordine-esterno.component.css']
})
export class ViewOrdineEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  orders_status: IParam[] = [];

  user: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  clothes: IClothe[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20];

  searchOrders: IOrder[] = [];

  state!: string;
  searchOrder!: string;
  orderId!: number;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response_order_status = await axios.get("http://127.0.0.1:8000/api/param/order_status");
      this.orders_status = response_order_status.data;

      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response_user.data;

      let response_client = await axios.get("http://127.0.0.1:8000/api/clients");
      this.clients = response_client.data;

      let response_order = await axios.get("http://127.0.0.1:8000/api/orders");
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

  public filter(type: string) {
    switch(type){
      case 'ordine':
        for (let index in this.orders) {
          if (this.orders[index].n_ordine.toString() == this.searchOrder) {
            let put = true;
            for (let anotherIndex in this.searchOrders) {
              if (this.searchOrders[index] === this.orders[anotherIndex]) {
                put = false;
              }
            }
            if (put)
              this.searchOrders.push(this.orders[index]);
          }
        }
    }
 
  }
  public search(were: string) {
    switch(were) {
      case 'ordine':
        if (this.searchOrder == "" || this.searchOrder == " "){
          this.searchOrders.splice(0,this.searchOrders.length);
          this.searchOrder = "";
        }
        this.filter('ordine');
        break;
    }
  }

  async filterOrder() {
    let search = this.searchOrder;
    let status = this.state;
    if(status == ""){
      status = "all";
    }
    status = JSON.stringify(status);
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
    this.orderId = orderId;
    localStorage["id"] = this.orderId;
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
    console.log(orderId);
  }

  openEditOrderDialog(orderId: number) {
    this.orderId = orderId;
    localStorage["id"] = this.orderId;
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
    console.log(orderId);
  }

}

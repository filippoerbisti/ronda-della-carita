import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/dialog/client/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/dialog/order/delete-order-dialog/delete-order-dialog.component';
import { EditClientDialogComponent } from 'src/app/dialog/client/edit-client-dialog/edit-client-dialog.component';
import { EditOrderDialogComponent } from 'src/app/dialog/order/edit-order-dialog/edit-order-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import { IClient } from 'src/app/shared/interface/iclient';
import { IOrder } from 'src/app/shared/interface/iorder';
import { ICard } from 'src/app/shared/interface/icard';
import { Router } from '@angular/router';
import { IClothe } from 'src/app/shared/interface/iclothe';
import { IParam } from 'src/app/shared/interface/iparam';

@Component({
  selector: 'app-home-interno',
  templateUrl: './home-interno.component.html',
  styleUrls: ['./home-interno.component.css']
})
export class HomeInternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  orders_status: IParam[] = [];

  user: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  cards: ICard[] = [];
  clothes: IClothe[] = [];

  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  searchClients: IClient[] = [];
  searchOrders: IOrder[] = [];

  state!: string;
  searchOrder!: string;
  searchClient!: string;
  orderNonDisp!: number;
  orderInAttesa!: number;

  clientId!: number;
  orderId!: number;

  countNotifiche!: number;
  
  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}

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

      let response_order_nondisp = await axios.get("http://127.0.0.1:8000/api/orders/nondisp");
      this.orderNonDisp = response_order_nondisp.data;

      let response_order_inattesa = await axios.get("http://127.0.0.1:8000/api/orders/inattesa");
      this.orderInAttesa = response_order_inattesa.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp;
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
        break;
      case 'nuovoassistito':
        for (let index in this.clients) {
          if (this.clients[index].nome.toLowerCase() == this.searchClient.toLowerCase()) {
            let put=true;
            for (let anotherIndex in this.searchClients) {
              if (this.searchClients[index] === this.clients[anotherIndex]){
                put = false;
              }
            }
            if (put)
              this.searchClients.push(this.clients[index]);
          }
        }
        break;
    }
 
  }
  public search(were: string) {
    switch(were) {
      case 'nuovoassistito':
        if (this.searchClient == "" || this.searchClient == " ") {
          this.searchClients.splice(0, this.searchClients.length);
          this.searchClient = "";
        }
        this.filter('nuovoassistito');
        break;
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
      let response_filter = await axios.get("http://127.0.0.1:8000/api/orders/filt/" + status);
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

  openDeleteClientDialog(clientId: number) {
    this.clientId = clientId;
    localStorage["id"] = this.clientId;
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog(orderId: number) {
    this.orderId = orderId;
    localStorage["id"] = this.orderId;
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  openEditOrderDialog(orderId: number) {
    this.orderId = orderId;
    localStorage["id"] = this.orderId;
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
  }

  openEditClientDialog(clientId: number) {
    this.clientId = clientId;
    localStorage["id"] = this.clientId;
    const dialogRef = this.dialog.open(EditClientDialogComponent);
  }
}

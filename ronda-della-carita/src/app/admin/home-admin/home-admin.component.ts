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

<<<<<<< HEAD
  userId!: number;
  orderId!: number;
  clientId!: number;
=======
  searchUsers:IUser[]=[];
  searchClients:IClient[]=[];
  searchOrders:IOrder[]=[];

>>>>>>> 19644b3395c992bb322ac40908b04e2706a07b33

  pageUserSlice = this.users.slice(0, 10);
  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  searchUser!: string;
  state!: string;
  searchOrder!: string;
  searchClient!: string;
  orderNonDisp!: number;
  orderInAttesa!: number;
  accessiOggi!: number;
  
  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

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

      let response_accessi_oggi = await axios.get("http://127.0.0.1:8000/api/history/accessi/count");
      console.log(response_accessi_oggi.status);
      console.log(response_accessi_oggi.data);
      this.accessiOggi = response_accessi_oggi.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageUserSlice = this.users.slice(0, 10); 
    this.pageOrderSlice = this.orders.slice(0, 10); 
    this.pageClientSlice = this.clients.slice(0, 10);
  }  

  goToUserAdmin() {
    this.router.navigateByUrl('/user-admin');
  }

  goToOrderAdmin() {
    this.router.navigateByUrl('/order-admin');
  }

  goToClientAdmin() {
    this.router.navigateByUrl('/client-admin');
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

  public filter(type:string) {
    switch(type){
      case 'user':
        for(let index in this.users) {
          if(this.users[index].nome.toLowerCase()==this.searchUser.toLowerCase()){
            let put=true;
            for(let anotherIndex in this.searchUsers){
              if(this.searchUsers[index]===this.users[anotherIndex]){
                put=false;
              }
            }
            if(put)
              this.searchUsers.push(this.users[index]);
          }
        }
        break;
      case 'ordine':
        for(let index in this.orders) {
          if(this.orders[index].n_ordine.toString()==this.searchOrder){
            let put=true;
            for(let anotherIndex in this.searchOrders){
              if(this.searchOrders[index]===this.orders[anotherIndex]){
                put=false;
              }
            }
            if(put)
              this.searchOrders.push(this.orders[index]);
          }
        } 
        break;
      case 'nuovoassisitio':
        for(let index in this.clients) {
          if(this.clients[index].nome.toLowerCase()==this.searchClient.toLowerCase()){
            let put=true;
            for(let anotherIndex in this.searchClients){
              if(this.searchClients[index]===this.clients[anotherIndex]){
                put=false;
              }
            }
            if(put)
              this.searchClients.push(this.clients[index]);
          }
        }
        break;
    }
    
  }
  public search(were:string){
    switch(were){
      case 'nuovoassisitio':
        if(this.searchClient=="" || this.searchClient==" "){
          this.searchClients.splice(0,this.searchClients.length);
          this.searchClient="";
        }
        this.filter('nuovoassisitio');
        break;
      case 'ordine':
        if(this.searchOrder=="" || this.searchOrder==" "){
          this.searchOrders.splice(0,this.searchOrders.length);
          this.searchOrder="";
        }
        this.filter('ordine');
        break;
      case 'volontario':
        if(this.searchUser=="" || this.searchUser==" "){
          this.searchUsers.splice(0,this.searchUsers.length);
          this.searchUser="";
        }
        this.filter('user');
        break;
    }
  }

  async filterOrder() {
    if(this.searchOrder!=""){
      this.searchOrder="";
    }
    let search = this.searchOrder;
    let status = this.state;
    if(status==""){
      status="all";
    }
    status=JSON.stringify(status);
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/orders/filt/"+status);
      console.log(response_filter.status);
      console.log("data",response_filter.data);
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

  openDeleteUserDialog(userId: number) {
    this.userId = userId;
    localStorage["id"] = this.userId;
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
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

  openEditUserDialog(userId: number) {
    this.userId = userId;
    localStorage["id"] = this.userId;
    const dialogRef = this.dialog.open(EditUserDialogComponent);
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

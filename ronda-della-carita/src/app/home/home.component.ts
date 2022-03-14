import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/dialog/client/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/dialog/order/delete-order-dialog/delete-order-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/dialog/user/delete-user-dialog/delete-user-dialog.component';
import { EditClientDialogComponent } from 'src/app/dialog/client/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from 'src/app/dialog/user/edit-user-dialog/edit-user-dialog.component';
import { EditOrderDialogComponent } from 'src/app/dialog/order/edit-order-dialog/edit-order-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import { IOrder } from 'src/app/shared/interface/iorder';
import { IClient } from 'src/app/shared/interface/iclient';
import { IHistory } from '../shared/interface/ihistory';
import { ViewOrderNotificationDialogComponent } from '../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
// import { IClothe } from 'src/app/shared/interface/iclothe';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  indexTab!: number;

  isAdmin!: boolean;

  pdf: any;

  order_cons = 'Consegnato';
  order_no_disp = 'Non disponibile';
  order_attesa = 'Attesa';
  order_da_conf = 'Da confermare';

  users: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  // clothes: IClothe[] = [];

  userId!: number;
  orderId!: number;
  clientId!: number;

  @ViewChild('viewPDF', { static: false }) viewPDF!: ElementRef;

  orderPDF!: IOrder;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  status: string[] = ["Consegnato", "Non disponibile", "Attesa", "Da confermare"];
  order_status!: string;

  user!: IUser;
  history!: IHistory;
  rule!: any;

  countNotifiche!: number;
  orderNonDisp!: number;
  orderInAttesa!: number;
  orderDaConf!: number;

  typeNotification!: string;

  state!: string;
  searchUser!: string;
  searchOrder!: string;
  searchClient!: string;

  searchUsers: IUser[] = [];
  searchClients: IClient[] = [];
  searchOrders: IOrder[] = [];

  pageUserSlice = this.users.slice(0, 10);
  pageOrderSlice = this.orders.slice(0, 10);
  pageClientSlice = this.clients.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.isAdmin = window.location.href.includes('admin');
    try {
      let response_account = await axios.get("http://localhost:8000/api/user", {withCredentials: true});
      this.user = response_account.data;
      console.log(this.user);

      let historyId = this.user.id;
      let response_history = await axios.get("http://localhost:8000/api/history/" + historyId);
      this.history = response_history.data;

      let response_user = await axios.get("http://localhost:8000/api/users");
      this.users = response_user.data;

      let response_client = await axios.get("http://localhost:8000/api/clients");
      this.clients = response_client.data;

      let response_order = await axios.get("http://localhost:8000/api/orders");
      this.orders = response_order.data;

      let response_order_nondisp = await axios.get("http://localhost:8000/api/orders/nondisp");
      this.orderNonDisp = response_order_nondisp.data;

      let response_order_inattesa = await axios.get("http://localhost:8000/api/orders/inattesa");
      this.orderInAttesa = response_order_inattesa.data;

      let response_order_daconf= await axios.get("http://localhost:8000/api/orders/daconf");
      this.orderDaConf = response_order_daconf.data;

    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp + this.orderDaConf;

    if (window.location.href.includes('order')) {
      this.indexTab = 0;
    } else if (window.location.href.includes('client')) {
      this.indexTab = 1;
    };

    this.pageUserSlice = this.users.slice(0, 10);
    this.pageOrderSlice = this.orders.slice(0, 10);
    this.pageClientSlice = this.clients.slice(0, 10);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
    }
    this.router.navigateByUrl(`/${this.rule}` + '/home');
  }

  goToConfirm() {
    this.router.navigateByUrl('/confirm/user');
  }

  goToHistory() {
    this.router.navigateByUrl('/history');
  }

  goToCreateUser() {
    if (this.user.ruolo === 'admin') {
      this.rule = `${this.user.ruolo}`;
    } else if (this.user.ruolo === 'vol') {
      this.rule = `${this.user.ruolo}`;
    }
    this.router.navigateByUrl('create/user/' + this.rule);
  }

  goToCreateOrder() {
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    }
  }

  goToViewOrder() {
    if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.indexTab = 0;
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    }
  }

  goToCreateClient() {
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    }
  }

  goToViewClient() {
    if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.indexTab = 1;
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    }
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

  public filter(type: string) {
    switch (type) {
      case 'user':
        for (let index in this.users) {
          if (this.users[index].nome.toLowerCase() == this.searchUser.toLowerCase()) {
            let put = true;
            for (let anotherIndex in this.searchUsers) {
              if (this.searchUsers[index] === this.users[anotherIndex]) {
                put = false;
              }
            }
            if (put)
              this.searchUsers.push(this.users[index]);
          }
        }
        break;
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
            let put = true;
            for (let anotherIndex in this.searchClients) {
              if (this.searchClients[index] === this.clients[anotherIndex]) {
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
    switch (were) {
      case 'nuovoassistito':
        if (this.searchClient == "" || this.searchClient == " ") {
          this.searchClients.splice(0, this.searchClients.length);
          this.searchClient = "";
        }
        this.filter('nuovoassistito');
        break;
      case 'ordine':
        if (this.searchOrder == "" || this.searchOrder == " ") {
          this.searchOrders.splice(0, this.searchOrders.length);
          this.searchOrder = "";
        }
        this.filter('ordine');
        break;
      case 'volontario':
        if (this.searchUser == "" || this.searchUser == " ") {
          this.searchUsers.splice(0, this.searchUsers.length);
          this.searchUser = "";
        }
        this.filter('user');
        break;
    }
  }

  async filterUser() {
    let search = this.searchUser;
    try {
      let response_filter = await axios.get("http://localhost:8000/api/users/" + search);
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
    let status = this.order_status;
    console.log("status" + status);
    if (search == undefined || search == "")
      search = "nu";
    if (status == undefined)
      status = "all";
    console.log("search" + search)
    try {
      let response_filter = await axios.get("http://localhost:8000/api/orders/filt/" + status+"/search/"+search);
      console.log(response_filter.status);
      console.log("data", response_filter.data);
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
      let response_filter = await axios.get("http://localhost:8000/api/clients/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.clients = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageClientSlice = this.clients.slice(0, 10);
  }

  async openPreviewPDF() {
    // if (this.router.url.includes('vol1')) {
    //   this.router.navigateByUrl('vol1/preview-pdf/' + n_ordine);
    // }
    // if (this.router.url.includes('vol0')) {
    //   this.router.navigateByUrl('vol0/preview-pdf/' + n_ordine);
    // }
    // if (this.router.url.includes('admin')) {
    //   this.router.navigateByUrl('admin/preview-pdf/' + n_ordine);
    // }

    try {
      await axios.get("http://localhost:8000/api/download/pdf");
    }
    catch (err) {
      console.log(err);
    }
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

  viewOrderInAttesa() {
    localStorage.removeItem("view_notification");
    this.typeNotification = "In attesa";
    localStorage["view_notification"] = this.typeNotification;
    const dialogRef = this.dialog.open(ViewOrderNotificationDialogComponent);
  }

  viewOrderNonDisp() {
    localStorage.removeItem("view_notification");
    this.typeNotification = "Non disponibile";
    localStorage["view_notification"] = this.typeNotification;
    const dialogRef = this.dialog.open(ViewOrderNotificationDialogComponent);
  }

  viewOrderDaConf() {
    localStorage.removeItem("view_notification");
    this.typeNotification = "Da confermare";
    localStorage["view_notification"] = this.typeNotification;
    const dialogRef = this.dialog.open(ViewOrderNotificationDialogComponent);
  }


}


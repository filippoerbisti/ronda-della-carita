import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from 'src/app/dialog/client/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from 'src/app/dialog/order/delete-order-dialog/delete-order-dialog.component';
import { ConfirmOrderDialogComponent } from 'src/app/dialog/order/confirm-order-dialog/confirm-order-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/dialog/user/delete-user-dialog/delete-user-dialog.component';
import { EditClientDialogComponent } from 'src/app/dialog/client/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from 'src/app/dialog/user/edit-user-dialog/edit-user-dialog.component';
import { EditOrderDialogComponent } from 'src/app/dialog/order/edit-order-dialog/edit-order-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/interface/IUser';
import { IOrder } from 'src/app/shared/interface/IOrder';
import { IClient } from 'src/app/shared/interface/IClient';
import { IHistory } from 'src/app/shared/interface/IHistory';
import { IStatus } from 'src/app/shared/interface/IStatus';
import { ConfirmDialogComponent } from '../dialog/confirm/confirm-dialog/confirm-dialog.component';
import { UpdateClothesStatusComponent } from '../dialog/order/update-clothes-status/update-clothes-status.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private API_URL = environment.API_URL;

  isLoading = false;
  panelOpenState = false;

  indexTab!: number;

  isAdmin!: boolean;

  order_cons = 'Consegnato';
  order_no_disp = 'Non disponibile';
  order_attesa = 'Attesa';
  order_da_conf = 'Da confermare';
  order_da_cons = 'Da consegnare';
  order_da_prep = 'Da preparare';

  users: IUser[] = [];
  clients: IClient[] = [];
  orders: IOrder[] = [];
  statuses: IStatus[] = [];

  userId!: number;
  orderId!: number;
  clientId!: number;

  orderPDF!: IOrder;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

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

  swipeTime: any;
  swipeCoord: any;
  slides = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {    
    this.isLoading = true;
    this.isAdmin = window.location.href.includes('admin');
    this.indexTab = 0;
    try {
      let response_account = await axios.get(this.API_URL + "/api/user", { withCredentials: false });
      this.user = response_account.data;

      let response_statuses = await axios.get(this.API_URL + "/api/statuses/orders");
      this.statuses = response_statuses.data;

      let historyId = this.user.id;
      let response_history = await axios.get(this.API_URL + "/api/history/" + historyId);
      this.history = response_history.data;

      let response_user = await axios.get(this.API_URL + "/api/users");
      this.users = response_user.data;

      let response_client = await axios.get(this.API_URL + "/api/clients");
      this.clients = response_client.data;

      let response_order = await axios.get(this.API_URL + "/api/orders");
      this.orders = response_order.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp + this.orderDaConf;
    this.pageUserSlice = this.users.slice(0, 10);
    this.pageOrderSlice = this.orders.slice(0, 10);
    this.pageClientSlice = this.clients.slice(0, 10);

    let data = ['taglia', ''];
    for (let i = 0; i < this.orders.length; i++) {
      for (let y = 0; y < this.orders[i].clothes.length; y++) {
        if (this.orders[i].clothes[y].t_vestiario == "Giacca" || this.orders[i].clothes[y].t_vestiario == "Maglietta" || this.orders[i].clothes[y].t_vestiario == "Camicia") {
          this.orders[i].clothes[y]["taglia"] = this.orders[i].client?.t_maglietta;
        }
        if (this.orders[i].clothes[y].t_vestiario == "Pantaloni" || this.orders[i].clothes[y].t_vestiario == "Intimo") {
          this.orders[i].clothes[y]["taglia"] = this.orders[i].client?.t_pantaloni;
        }
        if (this.orders[i].clothes[y].t_vestiario == "Calze" || this.orders[i].clothes[y].t_vestiario == "Scarpe") {
          this.orders[i].clothes[y]["taglia"] = this.orders[i].client?.t_scarpe;
        }
      }
    }
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

  goToHistory() {
    this.router.navigateByUrl('/admin/history');
  }

  navigateTo(url: string) {
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
      this.router.navigateByUrl(`/${this.rule}` + url);
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.router.navigateByUrl(`/${this.rule}` + url);
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + url);
    }
  }

  goToCreateUser() {
    this.navigateTo('/create/user');
  }

  goToCreateOrder() {
    this.navigateTo('/create/order');
  }

  goToViewOrder() {
    if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.indexTab = 0;
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    }
  }


  goToCreateClient() {
    this.navigateTo('/create/client');
  }

  goToViewClient() {
    if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
      this.indexTab = 1;
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    }
  }

  editUser(userId: number) {
    this.navigateTo("/edit/user/" + userId)
  }

  editOrder(orderId: number) {
    this.navigateTo("/edit/order/" + orderId)
  }

  editClient(clientId: number) {
    this.navigateTo("/edit/client/" + clientId)
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
      let response_filter = await axios.get(this.API_URL + "/api/users/" + search);
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
    console.log("status", status);
    if (search == undefined || search == "")
      search = "nu";
    if (status == undefined)
      status = "all";
    console.log("search" + search)
    try {
      let response_filter = await axios.get(this.API_URL + "/api/orders/filt/" + status + "/search/" + search);
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
      let response_filter = await axios.get(this.API_URL + "/api/clients/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.clients = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageClientSlice = this.clients.slice(0, 10);
  }

  async openPreviewPDF(id: any) {
    try {
      window.open(this.API_URL + "/api/download/pdf/" + id, "_blank");
      this.snackBar.open('Download completato!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
    catch (err) {
      console.log(err);
      this.snackBar.open('ERRORE: Download fallito!', '', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  openDeleteUserDialog(userId: number) {
    this.userId = userId;
    localStorage["idDeleteUser"] = this.userId;
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
  }

  openDeleteClientDialog(clientId: number) {
    this.clientId = clientId;
    localStorage["idDeleteClient"] = this.clientId;
    const dialogRef = this.dialog.open(DeleteClientDialogComponent);
  }

  openDeleteOrderDialog(orderId: number) {
    this.orderId = orderId;
    localStorage["idDeleteOrder"] = this.orderId;
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  clothesStatus(orderId: number) {
    const dialogRef = this.dialog.open(UpdateClothesStatusComponent, {
      data: {
        orderId
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.isLoading = true;
      this.filterOrder();
      this.isLoading = false;
      
    })
  }

  async confirmOrder(orderId: number) {
    this.orderId = orderId;
    localStorage["idConfirmOrder"] = this.orderId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Conferma ordine",
        description: "Contrassegnare questo ordine come consegnato?",
        confirmLabel: "Conferma"
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log("result");
        let response = await axios.put(this.API_URL + "/api/order/confirm/" + orderId)
        this.isLoading = true;
        this.filterOrder();
        this.isLoading = false;
      }
    })
  }

  deliverOrder(orderId: number) {
    this.orderId = orderId;
    localStorage["idConfirmOrder"] = this.orderId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Spedisci ordine",
        description: "Mandare questo ordine in spedizione?",
        confirmLabel: "Conferma"
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log("confirm");
        let response = await axios.put(this.API_URL + "/api/order/deliver/" + orderId)
        this.filterOrder();
      }

    })
  }

  openEditUserDialog(userId: number) {
    this.userId = userId;
    localStorage["idEditUser"] = this.userId;
    const dialogRef = this.dialog.open(EditUserDialogComponent);
  }

  openEditOrderDialog(orderId: number) {
    this.orderId = orderId;
    localStorage["idEditOrder"] = this.orderId;
    const dialogRef = this.dialog.open(EditOrderDialogComponent);
  }

  openEditClientDialog(clientId: number) {
    this.clientId = clientId;
    localStorage["idEditClient"] = this.clientId;
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

  onSwipeRight(event: any, data: any) {
    this.indexTab = this.indexTab + data
    if (window.location.href.includes('vol1') || window.location.href.includes('vol0')) {
      if (this.indexTab == 2) {
        this.indexTab = 0
        }
    } else if (window.location.href.includes('admin')) {
      if (this.indexTab == 3) {
        this.indexTab = 0
      }
    }
  }

  onSwipeLeft(event: any, data: any) {
    if (window.location.href.includes('vol1') || window.location.href.includes('vol0')) {
      if (this.indexTab == -2) {
        this.indexTab = 0
        }
    } else if (window.location.href.includes('admin')) {
      if (this.indexTab == -3) {
        this.indexTab = 0
      }
    }
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        console.info(swipe);
        if (swipe === 'next') {
          const isFirst = this.indexTab === 0;
          if (this.indexTab <= 3) {
            this.indexTab = isFirst ? 1 : this.indexTab + 1;
          }
          console.log("Swipe left — INDEX: " + this.indexTab);
        } else if (swipe === 'previous') {
          const isLast = this.indexTab === 4;
          if (this.indexTab >= 1) {
            this.indexTab = this.indexTab - 1;
          }
          console.log("Swipe right — INDEX: " + this.indexTab);
        }
      }
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import axios from 'axios';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../../../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interface/iuser';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= false;

  urlAdmin = "/home/admin";
  urlInterno = "/home/interno";
  urlEsterno = "/home/esterno";

  user!: IUser;

  countNotifiche!: number;
  orderNonDisp!: number;
  orderInAttesa!: number;
  orderDaConf!: number;

  currentRoute!: string;

  typeNotification!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {
    this.currentRoute = this.router.url;
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response_user.data;
      let response_order_nondisp = await axios.get("http://127.0.0.1:8000/api/orders/nondisp");
      this.orderNonDisp = response_order_nondisp.data;
      let response_order_inattesa = await axios.get("http://127.0.0.1:8000/api/orders/inattesa");
      this.orderInAttesa = response_order_inattesa.data;
      let response_order_daconf= await axios.get("http://127.0.0.1:8000/api/orders/daconf");
      this.orderDaConf = response_order_daconf.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp + this.orderDaConf;

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    this.isSidebarOpen = false;
  }

  goToHome() {
    if(this.currentRoute === this.urlAdmin) {
      this.router.navigateByUrl('/home/admin');
    } else if(this.currentRoute === this.urlInterno) {
      this.router.navigateByUrl('/home/interno');
    } else if (this.currentRoute === this.urlEsterno) {
      this.router.navigateByUrl('/home/esterno');
    }
    this.isSidebarOpen = false;
  }

  goToConfirm() {
    this.router.navigateByUrl('/confirm/user');
    this.isSidebarOpen = false;
  }

  goToHistory() {
    this.router.navigateByUrl('/history');
    this.isSidebarOpen = false;
  }

  goToCreateUser() {
    this.router.navigateByUrl('/create/user');
    this.isSidebarOpen = false;
  }

  goToCreateClient() {
    this.router.navigateByUrl('/create/client');
    this.isSidebarOpen = false;
  }

  goToCreateOrder() {
    this.router.navigateByUrl('/create/order');
    this.isSidebarOpen = false;
  }

  openMansionDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
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

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../../../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import axios from 'axios';
import { IHistory } from 'src/app/shared/interface/ihistory';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= false;

  isAdmin = window.location.href.includes('admin');

  user!: IUser;
  history!: IHistory;
  rule!: any;

  countNotifiche!: number;
  orderNonDisp!: number;
  orderInAttesa!: number;
  orderDaConf!: number;

  currentRoute!: string;

  typeNotification!: string;

  constructor(
    public dialog: MatDialog,
    public router: Router
    ) { }

  async ngOnInit() {
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response_user.data;
      let historyId = this.user.id;
      let response_history = await axios.get("http://127.0.0.1:8000/api/history/" + historyId);
      this.history = response_history.data;
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
    if(window.location.href.includes('admin')) {
      this.router.navigateByUrl('/home/admin');
    } else if(window.location.href.includes('vol1')) {
      this.router.navigateByUrl('/home/interno');
    } else if (window.location.href.includes('vol0')) {
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
    if (this.user.param?.value === 'admin') {
      this.rule =  `${this.user.param?.value}`;
    } else if (this.user.param?.value === 'vol') {
      this.rule =  `${this.user.param?.value}${this.history.interno}`;
    }
    this.router.navigateByUrl('/create/user/' + this.rule);
    this.isSidebarOpen = false;
  }

  goToCreateClient() {
    if (this.user.param?.value === 'admin') {
      this.rule =  `${this.user.param?.value}`;
    } else if (this.user.param?.value === 'vol') {
      this.rule =  `${this.user.param?.value}${this.history.interno}`;
    }
    this.router.navigateByUrl('/create/client/' + this.rule);
    this.isSidebarOpen = false;
  }

  goToCreateOrder() {
    if (this.user.param?.value === 'admin') {
      this.rule =  `${this.user.param?.value}`;
    } else if (this.user.param?.value === 'vol') {
      this.rule =  `${this.user.param?.value}${this.history.interno}`;
    }
    this.router.navigateByUrl('/create/order/' + this.rule);
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

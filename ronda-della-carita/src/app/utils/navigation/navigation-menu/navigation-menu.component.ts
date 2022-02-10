import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../../../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import axios from 'axios';
import { IHistory } from 'src/app/shared/interface/ihistory';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  isAdmin!: boolean;
  urlEsterno!: boolean;

  user!: IUser;
  history!: IHistory;
  rule!: any;

  countNotifiche!: number;
  orderNonDisp!: number;
  orderInAttesa!: number;
  orderDaConf!: number;

  typeNotification!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {
    this.isAdmin = window.location.href.includes('admin');
    this.urlEsterno = window.location.href.includes('vol0');
    try {
      let response_user = await axios.get("https://backoffice-ronda.herokuapp.com/api/user");
      this.user = response_user.data;
      let historyId = this.user.id;
      let response_history = await axios.get("https://backoffice-ronda.herokuapp.com/api/history/" + historyId);
      this.history = response_history.data;
      let response_order_nondisp = await axios.get("https://backoffice-ronda.herokuapp.com/api/orders/nondisp");
      this.orderNonDisp = response_order_nondisp.data;
      let response_order_inattesa = await axios.get("https://backoffice-ronda.herokuapp.com/api/orders/inattesa");
      this.orderInAttesa = response_order_inattesa.data;
      let response_order_daconf= await axios.get("https://backoffice-ronda.herokuapp.com/api/orders/daconf");
      this.orderDaConf = response_order_daconf.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp + this.orderDaConf;
  }
  
  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    if (window.location.href.includes('vol1')) {
      this.rule =  'vol1';
    } else if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
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
    if (this.user.param?.value === 'admin') {
      this.rule =  `${this.user.param?.value}`;
    } else if (this.user.param?.value === 'vol') {
      this.rule =  `${this.user.param?.value}${this.history.interno}`;
    }
    this.router.navigateByUrl('create/user/' + this.rule);
  }

  goToCreateClient() {
    if (window.location.href.includes('vol1')) {
      this.rule =  'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    } else if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    }
  }

  goToCreateOrder() {
    if (window.location.href.includes('vol1')) {
      this.rule =  'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    } else if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/mob/home');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    }
    this.router.navigateByUrl('/create/order');
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

}

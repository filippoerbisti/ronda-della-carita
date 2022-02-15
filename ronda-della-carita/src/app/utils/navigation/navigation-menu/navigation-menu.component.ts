import { Component, OnInit, Directive, HostBinding, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../../../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import axios from 'axios';
import { IHistory } from 'src/app/shared/interface/ihistory';
import { AuthService } from '../../../shared/service/auth.service';
import { TokenService } from '../../../shared/service/token.service';
import { AuthStateService } from '../../../shared/service/auth-state.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  isAdmin!: boolean;
  urlEsterno!: boolean;

  isOpened: boolean = false;

  isSignedIn!: boolean;
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
    private router: Router,
    public authService: AuthService,
    private auth: AuthStateService,
    public token: TokenService,
    ) {
      // this.authService.profileUser().subscribe((data:any) => {
      //   this.user = data;
      // })
    }

  async ngOnInit() {
  //   this.auth.userAuthState.subscribe(val => {
  //     this.isSignedIn = val;
  // });
    this.isAdmin = window.location.href.includes('admin');
    this.urlEsterno = window.location.href.includes('vol0');
    try {
      let response_user = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/user");
      this.user = response_user.data;
      let historyId = this.user.id;
      let response_history = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/history/" + historyId);
      this.history = response_history.data;
      let response_order_nondisp = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/nondisp");
      this.orderNonDisp = response_order_nondisp.data;
      let response_order_inattesa = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/inattesa");
      this.orderInAttesa = response_order_inattesa.data;
      let response_order_daconf= await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/daconf");
      this.orderDaConf = response_order_daconf.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.countNotifiche = this.orderInAttesa + this.orderNonDisp + this.orderDaConf;
  }
  
  goToLogOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

  goToHome() {
    this.isOpened = false;
    this.isAdmin = window.location.href.includes('admin');
    this.urlEsterno = window.location.href.includes('vol0');
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
    this.router.navigateByUrl('/admin/create/user');
  }

  goToCreateClient() {
    if (window.location.href.includes('vol1')) {
      this.rule =  'vol1';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
    } else if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigateByUrl(`/${this.rule}` + '/create/client');
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
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
      this.router.navigateByUrl(`/${this.rule}` + '/create/order');
    }
  }

  goToViewAll() {
    if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigate([`/${this.rule}` + '/mob/home']);
    }
  }

  openMansionDialog() {
    this.isAdmin = window.location.href.includes('admin');
    this.urlEsterno = window.location.href.includes('vol0');
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

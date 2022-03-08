import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';
import { ChangePasswordDialogComponent } from '../../dialog/change-password-dialog/change-password-dialog.component';
import { ViewOrderNotificationDialogComponent } from '../../dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { IUser } from 'src/app/shared/interface/iuser';
import { IHistory } from 'src/app/shared/interface/ihistory';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @Input() openedSubject!: Subject<boolean>;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  getIndexTab!: number;

  isSidebarOpen = false;

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
    public router: Router,
    private breakpointObserver: BreakpointObserver
    ) { }

  async ngOnInit() {
    try {
      // let response_user = await axios.get("https://backoffice-ronda.herokuapp.com/api/user");
      // this.user = response_user.data;
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

  ngAfterContentInit() {
    this.openedSubject.subscribe(
      keepOpen => this.sidenav[keepOpen ? 'open' : 'close']()
    );
  }

  toggle() {
    this.openedSubject.next(!this.sidenav.opened);
  }

  goToLogOut() {
    this.router.navigateByUrl('/login');
    this.isSidebarOpen = false;
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
    this.router.navigateByUrl('/admin/create/user');
    this.isSidebarOpen = false;
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
    this.isSidebarOpen = false;
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
    this.isSidebarOpen = false;
  }

  goToViewAll() {
    if (window.location.href.includes('vol0')) {
      this.rule =  'vol0';
      this.router.navigate([`/${this.rule}` + '/mob/home']);
    }
    this.isSidebarOpen = false;
  }

  openPasswordDialog() {
    this.isSidebarOpen = false;
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
  
  isMobile() {
    return window.innerWidth < 500
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../../../dialog/mansion/change-mansion-dialog/change-mansion-dialog.component';
import axios from 'axios';
import { ChangePasswordDialogComponent } from '../../../dialog/change-password-dialog/change-password-dialog.component';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interface/iorder';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  isSidebarOpen= false;

  user = {
    nome: '',
    cognome: '',
    ruolo: 'string',
    email: 'string',
    password: 'string'
  };

  inattesa_orders: IOrder[] = [];
  daconf_orders: IOrder[] = [];
  nondisp_orders: IOrder[] = [];

  countNotifiche!: number;
  orderNonDisp!: number;
  orderInAttesa!: number;
  orderDaConf!: number;

  ruolo!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) { }

  async ngOnInit() {
    this.ruolo = localStorage["ruolo"];
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response_user.data;
      let response_inattesa_orders = await axios.get("http://127.0.0.1:8000/api/orders/notif/inattesa");
      this.inattesa_orders = response_inattesa_orders.data;
      let response_daconf_orders = await axios.get("http://127.0.0.1:8000/api/orders/notif/daconf");
      this.daconf_orders = response_daconf_orders.data;
      let response_nondisp_orders = await axios.get("http://127.0.0.1:8000/api/orders/notif/nondisp");
      this.nondisp_orders = response_nondisp_orders.data;

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
    localStorage.removeItem("ruolo");
  }

  goToHome() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/home-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/home-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToRegistrazione() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/registrazione-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-registrazione-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  goToOrdine() {
    if (this.ruolo === "interno") {
      this.router.navigateByUrl('/ordine-interno');
    } else if (this.ruolo === "esterno") {
      this.router.navigateByUrl('/view-ordine-esterno');
    } else {
      this.router.navigateByUrl('/page-not-found')
    }
  }

  openMansionDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}

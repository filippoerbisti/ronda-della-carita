import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interface/iorder';
import axios from "axios";

@Component({
  selector: 'app-view-order-notification-dialog',
  templateUrl: './view-order-notification-dialog.component.html',
  styleUrls: ['./view-order-notification-dialog.component.css']
})
export class ViewOrderNotificationDialogComponent implements OnInit {

  view_notification!: string;
  inAttesaOrders: any[] = [];
  nonDispOrders: any[] = [];
  daConfOrders: any[] = [];

  daConf = 'Da confermare';
  inAttesa = 'In attesa';
  nonDisp = 'Non disponibile';

  constructor() { }

  async ngOnInit() {
    this.view_notification = localStorage["view_notification"];
    try {
      let response_inattesa_orders = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/notif/inattesa");
      this.inAttesaOrders = response_inattesa_orders.data;
      let response_nondisp_orders = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/notif/nondisp");
      this.nonDispOrders = response_nondisp_orders.data;
      let response_daconf_orders = await axios.get("https://backoffice-ronda.herokuapp.com/api/auth/orders/notif/daconf");
      this.daConfOrders = response_daconf_orders.data;
    } 
    catch (err) {
      console.log(err);
    }
  }

}

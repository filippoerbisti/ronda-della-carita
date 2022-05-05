import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { IOrder } from 'src/app/shared/interface/IOrder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.css']
})
export class DeleteOrderDialogComponent implements OnInit {

  isLoading = false;

  order!: IOrder;
  orderId!: number;

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.orderId = localStorage["idDeleteOrder"];
    let orderId = this.orderId;
    console.log(this.orderId);
    try {
      let response = await axios.get(this.API_URL + "/api/order/" + orderId);
      console.log(response.status);
      console.log(response.data);
      this.order = response.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("idDeleteOrder");
  }

  async deleteOrder() {
    this.isLoading = true;
    this.orderId = localStorage["idDeleteOrder"];
    let orderId = this.orderId;
    console.log(orderId);
    await axios.delete(this.API_URL + "/api/order/delete/" + orderId)
      .then(response => {
        console.log(response);
      });
    localStorage.removeItem("idDeleteOrder");
    window.location.reload();
    this.isLoading = false;
  }

}

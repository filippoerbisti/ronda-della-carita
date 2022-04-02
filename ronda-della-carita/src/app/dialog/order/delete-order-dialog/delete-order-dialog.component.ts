import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { IOrder } from '../../../shared/interface/IOrder';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.css']
})
export class DeleteOrderDialogComponent implements OnInit {

  isLoading = false;

  order!: IOrder;
  orderId!: number;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.orderId = localStorage["id"];
    let orderId = this.orderId;
    console.log(this.orderId);
    try {
      let response = await axios.get("https://backoffice-ronda.herokuapp.com/api/order/" + orderId);
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
    localStorage.removeItem("id");
  }

  async deleteOrder() {
    this.isLoading = true;
    this.orderId = localStorage["id"];
    let orderId = this.orderId;
    console.log(orderId);
    await axios.delete("https://backoffice-ronda.herokuapp.com/api/order/delete/" + orderId)
      .then(response => {
        console.log(response);
      });
    localStorage.removeItem("id");
    window.location.reload();
    this.isLoading = false;
  }

}

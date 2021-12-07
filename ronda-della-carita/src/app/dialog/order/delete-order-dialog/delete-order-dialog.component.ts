import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { IOrder } from '../../../shared/interface/iorder';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.css']
})
export class DeleteOrderDialogComponent implements OnInit {

  isLoading = false;

  orders: IOrder[] = [];
  orderId!: number;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.orderId = localStorage["id"];
    let orderId = this.orderId;
    console.log(this.orderId);
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/order/" + orderId);
      console.log(response.status);
      console.log(response.data);
      this.orders = response.data;
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
      await axios.delete("http://127.0.0.1:8000/api/order/delete/" + orderId)
        .then(response => {
          console.log(response);
        });
    localStorage.removeItem("id");
    window.location.reload();
    this.isLoading = false;
  }

}

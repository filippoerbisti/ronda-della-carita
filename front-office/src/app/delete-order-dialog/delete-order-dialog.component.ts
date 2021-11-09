import { Component, OnInit } from '@angular/core';
import axios from "axios";

interface Order{
  id: number,
  n_ordine: number,
  p_ritiro: string
  genere: string,
  t_vestiario: string,
  taglia: string,
  quantita: number,
  status: string,
  note: string,
  //created_at: 'timestamp',
  //update_at: 'timestamp'
}

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.css']
})
export class DeleteOrderDialogComponent implements OnInit {

  isLoading = false;

  orders: Order[] = [];
  
  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/orders");
      console.log(response.status);
      console.log(response.data);
      this.orders = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  async deleteOrder() {
    let order_id = this.orders; 
      console.log(order_id);
      await axios.delete("http://127.0.0.1:8000/api/clients/" + order_id)
        .then(response => {
          console.log(response);
        });
  }

}

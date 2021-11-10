import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from '../../delete-order-dialog/delete-order-dialog.component';
import axios from "axios";
import { PageEvent } from '@angular/material/paginator';

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
  selector: 'app-view-ordine-esterno',
  templateUrl: './view-ordine-esterno.component.html',
  styleUrls: ['./view-ordine-esterno.component.css']
})
export class ViewOrdineEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  orders: Order[] = [];

  pageOrderSlice = this.orders.slice(0, 5);
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(public dialog: MatDialog) {
    
  }

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

  openDialog() {
    const dialogRef = this.dialog.open(DeleteOrderDialogComponent);
  }

  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.orders.length) {
      endIndex = this.orders.length;
    }
    this.pageOrderSlice = this.orders.slice(startIndex, endIndex);
  }

}

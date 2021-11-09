import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from '../../delete-order-dialog/delete-order-dialog.component';
import axios from "axios";

@Component({
  selector: 'app-view-ordine-esterno',
  templateUrl: './view-ordine-esterno.component.html',
  styleUrls: ['./view-ordine-esterno.component.css']
})
export class ViewOrdineEsternoComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  orders = [{
    id: 'integer',
    n_ordine: 'integer',
    p_ritiro: 'string',
    genere: 'char',
    t_vestiario: 'string',
    taglia: 'string',
    quantita: 'integer',
    status: 'string',
    note: 'string',
    created_at: 'timestamp',
    update_at: 'timestamp'
  }];

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

}

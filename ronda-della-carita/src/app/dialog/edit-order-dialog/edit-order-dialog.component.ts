import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from "axios";
import { IClient } from '../../shared/interface/iclient';
import { IOrder } from '../../shared/interface/iorder';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css']
})
export class EditOrderDialogComponent implements OnInit {

  isLoading = false;  
  nm = "";
  gen = "";
  myControl = new FormControl();
  clients: IClient[] = [];
  orders: IOrder[] = [];
  orderId!: number;
  filteredClients: Observable<IClient[]> | undefined;

  genders: string[] = ['Uomo', 'Donna'];
  choseGender = "Uomo";
  quantita = 1;

  public tvestiario = [
    {value: 'maglietta', viewValue: "Maglietta"},
    {value: 'pantaloni', viewValue: 'Pantaloni'},
    {value: 'scarpe', viewValue: 'Scarpe'},
  ];

  public tvestiarioUseCaseMapping: any = {
    "maglietta": [
      {value: 'xs', viewValue: 'XS'},
      {value: 's', viewValue: 'S'},
      {value: 'm', viewValue: 'M'},
      {value: 'l', viewValue: 'L'},
      {value: 'xl', viewValue: 'XL'},
      {value: 'xxl', viewValue: 'XXL'},
    ], 
    "pantaloni": [
      {value: 42, viewValue: 42},
      {value: 43, viewValue: 43},
      {value: 44, viewValue: 44},
      {value: 45, viewValue: 45},
      {value: 46, viewValue: 46},
      {value: 47, viewValue: 47},
      {value: 48, viewValue: 48},
      {value: 49, viewValue: 49},
      {value: 50, viewValue: 50},
      {value: 51, viewValue: 51},
      {value: 52, viewValue: 52},
      {value: 53, viewValue: 53},
      {value: 54, viewValue: 54},
      {value: 55, viewValue: 55},
      {value: 56, viewValue: 56},
      {value: 57, viewValue: 57},
      {value: 58, viewValue: 58},
    ],
    "scarpe": [
      {value: 36, viewValue: 36},
      {value: 37, viewValue: 37},
      {value: 38, viewValue: 38},
      {value: 39, viewValue: 39},
      {value: 40, viewValue: 40},
      {value: 41, viewValue: 41},
      {value: 42, viewValue: 42},
      {value: 43, viewValue: 43},
      {value: 44, viewValue: 44},
      {value: 45, viewValue: 45},
      {value: 46, viewValue: 46},
      {value: 47, viewValue: 47},
      {value: 48, viewValue: 48},
    ]
  };

  tvestiarioValue: any= 'maglietta';
  clientValue: any = 'Uomo';
  tagliaValue: any= '';

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.orderId = localStorage["id"];
    let orderId = this.orderId;
    try {
      let response_order = await axios.get("http://127.0.0.1:8000/api/order/" + orderId);
      console.log(response_order.status);
      console.log(response_order.data);
      this.orders = response_order.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("id");
  }

  editOrder() {
    window.location.reload();
  }

  

}

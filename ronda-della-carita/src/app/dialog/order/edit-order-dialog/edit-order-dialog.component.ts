import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import axios from "axios";
import { IClient } from 'src/app/shared/interface/IClient';
import { IOrder } from 'src/app/shared/interface/IOrder';
import { IClothe } from 'src/app/shared/interface/IClothe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css']
})
export class EditOrderDialogComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  nm = "";
  gen = "";
  myControl = new FormControl();
  clients: IClient[] = [];
  order!: IOrder;
  orderId!: number;
  clothes: IClothe[] = [];
  clotheId!: number;
  filteredClients: Observable<IClient[]> | undefined;

  genders: string[] = ['Uomo', 'Donna'];
  choseGender = "Uomo";
  quantita = 1;
  orders: any = [];

  public tvestiario = [
    { value: 'Maglietta', viewValue: "Maglietta" },
    { value: 'Pantaloni', viewValue: 'Pantaloni' },
    { value: 'Scarpe', viewValue: 'Scarpe' },
  ];

  public tvestiarioUseCaseMapping: any = {
    "Maglietta": [
      { value: 'xs', viewValue: 'XS' },
      { value: 's', viewValue: 'S' },
      { value: 'm', viewValue: 'M' },
      { value: 'l', viewValue: 'L' },
      { value: 'xl', viewValue: 'XL' },
      { value: 'xxl', viewValue: 'XXL' },
    ],
    "Pantaloni": [
      { value: "42", viewValue: 42 },
      { value: "43", viewValue: 43 },
      { value: "44", viewValue: 44 },
      { value: "45", viewValue: 45 },
      { value: "46", viewValue: 46 },
      { value: "47", viewValue: 47 },
      { value: "48", viewValue: 48 },
      { value: "49", viewValue: 49 },
      { value: "50", viewValue: 50 },
      { value: "51", viewValue: 51 },
      { value: "52", viewValue: 52 },
      { value: "53", viewValue: 53 },
      { value: "54", viewValue: 54 },
      { value: "55", viewValue: 55 },
      { value: "56", viewValue: 56 },
      { value: "57", viewValue: 57 },
      { value: "58", viewValue: 58 },
    ],
    "Scarpe": [
      { value: 36, viewValue: 36 },
      { value: 37, viewValue: 37 },
      { value: 38, viewValue: 38 },
      { value: 39, viewValue: 39 },
      { value: 40, viewValue: 40 },
      { value: 41, viewValue: 41 },
      { value: 42, viewValue: 42 },
      { value: 43, viewValue: 43 },
      { value: 44, viewValue: 44 },
      { value: 45, viewValue: 45 },
      { value: 46, viewValue: 46 },
      { value: 47, viewValue: 47 },
      { value: 48, viewValue: 48 },
    ]
  };

  tvestiarioValue: any = 'maglietta';
  clientValue: any = 'Uomo';
  tagliaValue: any = '';

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.orderId = localStorage["id"];
    let orderId = this.orderId;
    try {
      let response_order = await axios.get(this.API_URL + "/api/order/" + orderId);
      console.log(response_order.status);
      console.log(response_order.data);
      this.order = response_order.data;
      console.log(response_order.data.clothes)
      /*for(let i=0; i<response_order.data.clothes.length;i++){
        this.orders.push(response_order.data.clothes[i]);
        console.log(response_order.data.clothes[i]);
      }*/
      for (let i = 0; i < this.orders.length; i++) {
        this.orders[i].open = "false";
      }
      console.log("oreds", this.orders);
      let clotheId = this.order.id;
      let response_clothe = await axios.get(this.API_URL + "/api/clothe/edit/" + clotheId);
      console.log(response_clothe.status);
      console.log(response_clothe.data);
      this.clothes = response_clothe.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
  press(clothe: any) {
    console.log("clothe", clothe)
    clothe.open = true;
    console.log("open or not" + clothe.open)
  }
  save(prova: any) {
    /*let exist=false;
    for(let i = 0; i< this.orders.length;i++){
      if(this.orders[i].id==prova.id){
        exist=true;
        break;
      }
    }
    if(!prova){
      this.orders.push(prova);
    }*/
  }

  clearCache() {
    localStorage.removeItem("id");
  }

  editOrder() {
    window.location.reload();
  }

}

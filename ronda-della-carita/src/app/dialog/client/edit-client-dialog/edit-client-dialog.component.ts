import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { countries } from 'src/app/shared/store/country-data-store';
import { IClient } from 'src/app/shared/interface/IClient';
import { environment } from 'src/environments/environment';

interface Document {
  value: string;
  viewValue: string;
}

interface Value {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})
export class EditClientDialogComponent implements OnInit {

  isLoading = false;

  client!: IClient;
  clientId!: number;

  tdocuments: Document[] = [
    { value: 'cartaid', viewValue: "Carta d'Identità" },
    { value: 'patente', viewValue: 'Patente di Guida' },
    { value: 'passaport', viewValue: 'Passaporto' },
  ];

  public countries: any = countries;

  tmagliettas: Document[] = [
    { value: 'xs', viewValue: 'XS' },
    { value: 's', viewValue: 'S' },
    { value: 'm', viewValue: 'M' },
    { value: 'l', viewValue: 'L' },
    { value: 'xl', viewValue: 'XL' },
    { value: 'xxl', viewValue: 'XXL' },
  ];

  tpantalonis: Value[] = [
    { value: 42, viewValue: 42 },
    { value: 44, viewValue: 44 },
    { value: 46, viewValue: 46 },
    { value: 48, viewValue: 48 },
    { value: 50, viewValue: 50 },
    { value: 52, viewValue: 52 },
    { value: 54, viewValue: 54 },
    { value: 56, viewValue: 56 },
    { value: 58, viewValue: 58 },
  ];

  tscarpes: Value[] = [
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
  ];

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.clientId = localStorage["idEditClient"];
    let clientId = this.clientId;
    try {
      let response_order = await axios.get(this.API_URL + "/api/client/" + clientId);
      console.log(response_order.status);
      console.log(response_order.data);
      this.client = response_order.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("idEditClient");
  }

  editClient() {
    window.location.reload();
  }

}

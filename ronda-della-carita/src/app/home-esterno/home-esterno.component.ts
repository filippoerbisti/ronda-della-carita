import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-home-esterno',
  templateUrl: './home-esterno.component.html',
  styleUrls: ['./home-esterno.component.css']
})
export class HomeEsternoComponent implements OnInit {

  isLoading = false;

  user = {
    nome: 'string',
    cognome: 'string',
    ruolo: 'string',
    email: 'string',
    password: 'string'
  };

  constructor(private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("https://backoffice-ronda.herokuapp.com/api/user");
      console.log(response.status);
      console.log(response.data);
      this.user = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  goToCreateClient() {
    this.router.navigateByUrl('/vol0/create/client');
  }

  goToCreateOrder() {
    this.router.navigateByUrl('/vol0/create/order');
  }

  goToScannerQr() {
    this.router.navigateByUrl('/vol0/scanner-qr');
  }

}

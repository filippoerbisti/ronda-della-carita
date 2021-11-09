import { Component, OnInit } from '@angular/core';
import axios from "axios";

interface User {
  id: number,
  nome: string,
  cognome: string,
  ruolo: string,
  interno: boolean,
  email: string,
  //email_verified_at: timestamp,
  password: string,
  remember_token: string,
  //created_at: timestamp,
  //update_at: timestamp
};

@Component({
  selector: 'app-home-esterno',
  templateUrl: './home-esterno.component.html',
  styleUrls: ['./home-esterno.component.css']
})
export class HomeEsternoComponent implements OnInit {

  isLoading = false;

  user: User[] = [];

  constructor() {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/user");
      console.log(response.status);
      console.log(response.data);
      this.user = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

}

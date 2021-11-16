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
  created_at: Date,
  //update_at: timestamp
};

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  isLoading = false;

  users: User[] = [];

  checked = false;

  rules: string[] = ['Admin', 'Volontario'];

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/users");
      console.log(response.status);
      console.log(response.data);
      this.users = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
  editUser() {

  }
}

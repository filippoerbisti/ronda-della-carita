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
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  isLoading = false;

  users: User[] = [];

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

  async deleteUser() {
    let user_id = this.users; 
      console.log(user_id);
      await axios.delete("http://127.0.0.1:8000/api/users/" + user_id)
        .then(response => {
          console.log(response);
        });
  }

}

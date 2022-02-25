import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { IUser } from '../../../shared/interface/iuser';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  isLoading = false;

  user!: IUser;
  userId!: number;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage["id"];
    let userId = this.userId;
    console.log(this.userId);
    try {
      let response = await axios.get("https://backoffice-ronda.herokuapp.com/api/user/" + userId);
      console.log(response.status);
      console.log(response.data);
      this.user = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("id");
  }

  async deleteUser() {
    this.isLoading = true;
    this.userId = localStorage["id"];
    let userId = this.userId; 
    console.log(userId);
      await axios.delete("https://backoffice-ronda.herokuapp.com/api/user/delete/" + userId)
        .then(response => {userId
          console.log(response);
        });
    localStorage.removeItem("id");
    window.location.reload();
    this.isLoading = false;
  }

}

import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { IUser } from 'src/app/shared/interface/IUser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  isLoading = false;

  user!: IUser;
  userId!: number;

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage["idDeleteUser"];
    let userId = this.userId;
    console.log(this.userId);
    try {
      let response = await axios.get(this.API_URL + "/api/user/" + userId);
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
    localStorage.removeItem("idDeleteUser");
  }

  async deleteUser() {
    this.isLoading = true;
    this.userId = localStorage["idDeleteUser"];
    let userId = this.userId;
    console.log(userId);
    await axios.delete(this.API_URL + "/api/user/delete/" + userId)
      .then(response => {
        userId
        console.log(response);
      });
    localStorage.removeItem("idDeleteUser");
    window.location.reload();
    this.isLoading = false;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import axios from "axios";
import { IClient } from 'src/app/shared/interface/IClient';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {

  isLoading = false;

  client!: IClient;
  clientId!: number;

  private API_URL = environment.API_URL;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.clientId = localStorage["id"];
    let clientId = this.clientId;
    console.log(this.clientId);
    try {
      let response = await axios.get(this.API_URL + "/api/client/" + clientId);
      console.log(response.status);
      console.log(response.data);
      this.client = response.data;
    }
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  clearCache() {
    localStorage.removeItem("id");
  }

  async deleteClient() {
    this.isLoading = true;
    this.clientId = localStorage["id"];
    let clientId = this.clientId;
    console.log(clientId);
    await axios.delete(this.API_URL + "/api/client/delete/" + clientId)
      .then(response => {
        console.log(response);
      });
    localStorage.removeItem("id");
    window.location.reload();
    this.isLoading = false;
  }

}

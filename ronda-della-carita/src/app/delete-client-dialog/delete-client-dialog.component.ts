import { Component, OnInit, Input } from '@angular/core';
import axios from "axios";
import { IClient } from '../shared/interface/iclient';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {
  
  isLoading = false;

  clients: IClient[] = [];
  clientId!: number;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    this.clientId = localStorage["id"];
    let clientId = this.clientId;
    console.log(this.clientId);
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/client/" + clientId);
      console.log(response.status);
      console.log(response.data);
      this.clients = response.data;
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
      await axios.delete("http://127.0.0.1:8000/api/client/delete/" + clientId)
        .then(response => {
          console.log(response);
        });
    localStorage.removeItem("id");
    window.location.reload();
    this.isLoading = false;
  }

}

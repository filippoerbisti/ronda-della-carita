import { Component, OnInit, Input } from '@angular/core';
import axios from "axios";
import { IClient } from '../shared/interface/iclient';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {

  @Input()
  get clientId(): string { return this._clientId; }
  set clientId(clientId: string) {
    this._clientId = (clientId && clientId.trim());
  }
  private _clientId = '';
  
  isLoading = false;

  clients: IClient[] = [];

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
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

  async deleteClient() {
    let clientId = this.clients; 
    console.log(clientId);
    await axios.delete("http://127.0.0.1:8000/api/clients/" + clientId)
        .then(response => {
          console.log(response);
        });
  }

}

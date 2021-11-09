import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {

  isLoading = false;

  clients = [{
    id: 'integer',
    nome: 'string',
    cognome: 'string',
    genere: 'char',
    n_documento: 'string',
    t_documento: 'string',
    nazionalita: 'string',
    t_maglietta: 'string',
    t_pantaloni: 'string',
    t_scarpe: 'integer',
    note: 'string',
    created_at: 'timestamp',
    update_at: 'timestamp'
  }];

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/clients");
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
    let client_id = this.clients; 
      console.log(client_id);
      await axios.delete("http://127.0.0.1:8000/api/clients/" + client_id)
        .then(response => {
          console.log(response);
        });
  }

}

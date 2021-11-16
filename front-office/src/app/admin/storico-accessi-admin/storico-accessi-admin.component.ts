import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

interface History {
  id: number,
  ultimo_accesso: Date,
  user_id: number,
  user?: User
};

@Component({
  selector: 'app-storico-accessi-admin',
  templateUrl: './storico-accessi-admin.component.html',
  styleUrls: ['./storico-accessi-admin.component.css']
})
export class StoricoAccessiAdminComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  histories: History[] = [];

  pageHistorySlice = this.histories.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  searchAccess!: string;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/history");
      console.log(response.status);
      console.log(response.data);
      this.histories = response.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageHistorySlice = this.histories.slice(0, 10); 
  }  

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.histories.length) {
      endIndex = this.histories.length;
    }
    this.pageHistorySlice = this.histories.slice(startIndex, endIndex);
  }  

  async filterHistory() {
    let search = this.searchAccess;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/history/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.histories = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageHistorySlice = this.histories.slice(0, 10); 
  }
}

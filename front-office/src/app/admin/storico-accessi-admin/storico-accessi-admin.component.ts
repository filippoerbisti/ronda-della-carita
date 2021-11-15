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
  created_at: Date,
  //update_at: timestamp
};

@Component({
  selector: 'app-storico-accessi-admin',
  templateUrl: './storico-accessi-admin.component.html',
  styleUrls: ['./storico-accessi-admin.component.css']
})
export class StoricoAccessiAdminComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  users: User[] = [];

  pageUserSlice = this.users.slice(0, 10);
  pageSizeOptions: number[] = [5, 10, 20, 30];

  searchUser!: string;

  constructor() { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/users");
      console.log(response_user.status);
      console.log(response_user.data);
      this.users = response_user.data;
    } 
    catch (err) {
      console.log(err);
    }
    this.isLoading = false;
    this.pageUserSlice = this.users.slice(0, 10); 
  }  

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) {
      endIndex = this.users.length;
    }
    this.pageUserSlice = this.users.slice(startIndex, endIndex);
  }  

  async filterUser() {
    let search = this.searchUser;
    try {
      let response_filter = await axios.get("http://127.0.0.1:8000/api/users/" + search);
      console.log(response_filter.status);
      console.log(response_filter.data);
      this.users = response_filter.data;
    }
    catch (err) {
      console.log(err);
    }
    this.pageUserSlice = this.users.slice(0, 10); 
  }
}

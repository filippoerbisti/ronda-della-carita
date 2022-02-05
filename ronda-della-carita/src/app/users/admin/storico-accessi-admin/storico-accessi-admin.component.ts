import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from "axios";
import { IUser } from 'src/app/shared/interface/iuser';
import { IHistory } from 'src/app/shared/interface/ihistory';

@Component({
  selector: 'app-storico-accessi-admin',
  templateUrl: './storico-accessi-admin.component.html',
  styleUrls: ['./storico-accessi-admin.component.css']
})
export class StoricoAccessiAdminComponent implements OnInit {

  isLoading = false;
  panelOpenState = false;

  histories: IHistory[] = [];

  todayAccess: IHistory[] = [];
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

      let response_access_today = await axios.get("http://127.0.0.1:8000/api/history/accessi/today");
      console.log(response_access_today.status);
      console.log(response_access_today.data);
      this.todayAccess = response_access_today.data;
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
      let response_filter = await axios.get("http://127.0.0.1:8000/api/history/filt/" + search);
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

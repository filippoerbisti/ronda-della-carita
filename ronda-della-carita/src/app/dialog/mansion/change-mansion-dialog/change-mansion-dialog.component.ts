import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IHistory } from 'src/app/shared/interface/ihistory';
import { IUser } from 'src/app/shared/interface/iuser';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  urlInterno!: boolean;

  user!: IUser;
  newHistory = {
    'interno' : false,
    'ultimo_accesso' : '2022-02-07 11:58:53',
    'user_id': 2
  };

  constructor(
    private router: Router
    ) {
  }

  async ngOnInit() {
    this.urlInterno = window.location.href.includes('vol1');
    try {
      let response_user = await axios.get("http://127.0.0.1:8000/api/user");
      this.user = response_user.data;
      console.log(response_user.data);
    }
    catch (err) {
      console.log(err);
    }
      console.log(this.newHistory);
  }

  async goToHome() {
    // if(this.currentRoute === this.urlInterno) {
    //   this.router.navigateByUrl('/vol1/home');
    // } else if(this.currentRoute != this.urlInterno){
    //   this.router.navigateByUrl('/vol0/home');
    // }
    try {
      // this.newHistory.user_id = this.user.id;
      // this.newHistory.ultimo_accesso = new Date(Date.now());
      // this.newHistory.interno = false;
      let response = await axios.post("http://127.0.0.1:8000/api/history/create", this.newHistory);
      console.log(response.data);
      console.log(this.newHistory);
    }
    catch (err) {
      console.log(err);
    }

    if(window.location.href.includes('vol1')) {
      this.router.navigateByUrl('/vol0/home');
    } else if (window.location.href.includes('vol0')) {
      // try {
      //   this.newHistory.user_id = this.user.id;
      //   this.newHistory.ultimo_accesso = new Date(Date.now());
      //   this.newHistory.interno = true;
      //   let response = await axios.put("http://127.0.0.1:8000/api/history/create", this.newHistory);
      //   console.log(response.data);
      //   console.log(this.newHistory);

      // }
      // catch (err) {
      //   console.log(err);
      // }
      this.router.navigateByUrl('/vol1/home');
    }

    // if (this.user.param?.value === 'vol' && this.history.interno == true) {
    //   this.rule =  `${this.user.param?.value}${this.history.interno}`;
    // } else if (this.user.param?.value === 'vol' && this.history.interno == true) {
    //   this.rule =  `${this.user.param?.value}${this.history.interno}`;
    // }
    // this.router.navigateByUrl(`/${this.rule}` + '/home');
    // +++++change mansion === new history like new login -> methods put
  }
}

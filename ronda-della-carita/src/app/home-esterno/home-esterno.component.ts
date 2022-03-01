import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";
import { IUser } from '../shared/interface/iuser';

@Component({
  selector: 'app-home-esterno',
  templateUrl: './home-esterno.component.html',
  styleUrls: ['./home-esterno.component.css']
})
export class HomeEsternoComponent implements OnInit {

  isLoading = false;

  // user!: IUser;
  user: any;

  constructor(private router: Router) {
  }

  async ngOnInit() {
    this.isLoading = true;
    const x:any = localStorage.getItem('user')
    this.user = JSON.parse(x);
    // try {
    //   let response = await axios.get("http://localhost:8000/api/user-profile", {withCredentials: true});
    //   console.log(response.status);
    //   console.log(response.data);
      
    //   this.user = response.data;
    // } 
    // catch (err) {
    //   console.log(err);
    // }
    this.isLoading = false;
  }

  goToCreateClient() {
    this.router.navigateByUrl('/vol0/create/client');
  }

  goToCreateOrder() {
    this.router.navigateByUrl('/vol0/create/order');
  }

  goToScannerQr() {
    this.router.navigateByUrl('/vol0/scanner-qr');
  }

}

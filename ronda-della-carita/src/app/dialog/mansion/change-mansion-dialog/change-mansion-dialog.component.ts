import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  urlInterno!: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.urlInterno = window.location.href.includes('vol1')
  }

  goToHome() {
    // if(this.currentRoute === this.urlInterno) {
    //   this.router.navigateByUrl('/vol1/home');
    // } else if(this.currentRoute != this.urlInterno){
    //   this.router.navigateByUrl('/vol0/home');
    // }

    if(window.location.href.includes('vol1')) {
      this.router.navigateByUrl('/vol0/home');
    } else if (window.location.href.includes('vol0')) {
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

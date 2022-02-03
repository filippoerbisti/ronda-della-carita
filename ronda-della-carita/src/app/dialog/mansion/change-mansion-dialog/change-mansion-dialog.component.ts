import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  urlInterno = "/home/interno";

  currentRoute!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  goToHome() {
    if(this.currentRoute === this.urlInterno) {
      this.router.navigateByUrl('/home/esterno');
    } else if(this.currentRoute != this.urlInterno){
      this.router.navigateByUrl('/home/interno');
    }
  }
}

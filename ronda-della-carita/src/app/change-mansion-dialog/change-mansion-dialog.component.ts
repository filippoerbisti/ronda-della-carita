import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  current_route = this.router.url;
  home_esterno_url = "/home-esterno";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.current_route);
  }

}

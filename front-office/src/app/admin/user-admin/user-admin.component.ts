import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  isLoading = false;

  checked = false;

  rules: string[] = ['Admin', 'Volontario'];

  constructor() { }

  ngOnInit(): void {
  }

}

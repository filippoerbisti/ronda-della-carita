import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-mansion-dialog',
  templateUrl: './choose-mansion-dialog.component.html',
  styleUrls: ['./choose-mansion-dialog.component.css']
})
export class ChooseMansionDialogComponent implements OnInit {

  isLoading = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

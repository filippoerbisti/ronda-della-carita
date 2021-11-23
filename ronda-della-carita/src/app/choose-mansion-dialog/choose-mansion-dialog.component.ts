import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-mansion-dialog',
  templateUrl: './choose-mansion-dialog.component.html',
  styleUrls: ['./choose-mansion-dialog.component.css']
})
export class ChooseMansionDialogComponent implements OnInit {

  isLoading = false;
  
  constructor(
    public dialogRef: MatDialogRef<ChooseMansionDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

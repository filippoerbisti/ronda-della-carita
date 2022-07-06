import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sizes } from 'src/app/shared/store/size-clothe-data-store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from "axios";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) { }

  ngOnInit(): void {

    console.log(this.data);
    
  }

  confirm() {
    this.dialogRef.close(true)
  }

}

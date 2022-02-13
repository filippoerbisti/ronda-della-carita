import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-mansion-dialog',
  templateUrl: './choose-mansion-dialog.component.html',
  styleUrls: ['./choose-mansion-dialog.component.css']
})
export class ChooseMansionDialogComponent implements OnInit {

  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ChooseMansionDialogComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToHomeInterno() {
    this.router.navigateByUrl('/vol1/home');
    this.dialogRef.close();
  }

  goToHomeEsterno() {
    this.router.navigateByUrl('/vol0/home');
    this.dialogRef.close();
  }

}

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

  ruolo!: string;
  
  constructor(
    public dialogRef: MatDialogRef<ChooseMansionDialogComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToHomeInterno(ruolo: string) {
    this.dialogRef.close();
    this.ruolo = ruolo;
    localStorage["ruolo"] = this.ruolo;
    this.router.navigateByUrl('/home-interno');
  }

  goToHomeEsterno(ruolo: string) {
    this.dialogRef.close();
    this.ruolo = ruolo;
    localStorage["ruolo"] = this.ruolo;
    this.router.navigateByUrl('/home-esterno');
  }

}

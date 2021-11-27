import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  ruolo!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.ruolo = localStorage["ruolo"];
  }

  goToHomeInterno() {
    this.router.navigateByUrl('/home-interno');
    localStorage.removeItem("ruolo");
    localStorage["ruolo"] = "interno";
  }

  goToHomeEsterno() {
    this.router.navigateByUrl('/home-esterno');
    localStorage.removeItem("ruolo");
    localStorage["ruolo"] = "esterno";
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-mansion-dialog',
  templateUrl: './change-mansion-dialog.component.html',
  styleUrls: ['./change-mansion-dialog.component.css']
})
export class ChangeMansionDialogComponent implements OnInit {

  isLoading = false;

  rule!: string;

  private API_URL = environment.API_URL;

  public newHistory = {
    ruolo: '',
    idUtente: 0
  }

  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {
  }

  async goChangeMansion() {
    let vol1 = window.location.href.includes('vol1');
    let user = JSON.parse(localStorage["user"]);
    this.newHistory.idUtente = user.id;
    
    if (vol1) {
      this.rule = 'vol0';
      this.newHistory.ruolo = 'Esterno';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    } else {
      this.rule = 'vol1';
      this.newHistory.ruolo = 'Interno';
      this.router.navigateByUrl(`/${this.rule}` + '/home');
    }

    // let response = await axios.post(
    //   this.API_URL + '/api/history/change-mansion',
    //   this.newHistory
    // );

  }
}
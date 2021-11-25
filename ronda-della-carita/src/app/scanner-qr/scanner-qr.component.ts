import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.css']
})
export class ScannerQrComponent implements OnInit {

  qrResultString!: string;

  clearResult(): void {
    this.qrResultString = "";
  }

  onCodeResult(resultString: string) {
    this.router.navigateByUrl('/ordine-esterno');
    this.qrResultString = resultString;

  }

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  goToHomeEsterno() {
    this.router.navigateByUrl('/home-esterno');
  }

}

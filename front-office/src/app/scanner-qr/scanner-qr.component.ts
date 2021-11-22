import { Component, OnInit } from '@angular/core';

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
    this.qrResultString = resultString;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

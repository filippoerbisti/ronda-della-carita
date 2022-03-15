import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.css'],
})
export class ScannerQrComponent implements OnInit {
  qrResultString!: string;
  rule!: any;

  clearResult(): void {
    this.qrResultString = '';
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    alert(this.qrResultString);
    if (window.location.href.includes('vol1')) {
      this.rule = 'vol1';
    } else if (window.location.href.includes('vol0')) {
      this.rule = 'vol0';
    } else if (window.location.href.includes('admin')) {
      this.rule = 'admin';
    }
    this.router.navigateByUrl(`/${this.rule}` + '/create/order/' + this.qrResultString);
  }

  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToHome() {
    // this.router.navigateByUrl('/vol0/home');
  }
}

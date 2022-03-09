import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import { IOrder } from '../shared/interface/iorder';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent implements OnInit {

  @ViewChild('viewPDF', {static: false}) viewPDF!: ElementRef;

  orderPDF!: IOrder;

  isLoading = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  durationInSeconds = 3;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    let n_ordine = this.route.snapshot.paramMap.get("n_ordine");
    try {
      let response_order_pdf= await axios.get("https://backoffice-ronda.herokuapp.com/api/order/" + n_ordine);
      this.orderPDF = response_order_pdf.data;
      this.isLoading = false;
    } 
    catch (err) {
      console.log(err);
    }
  }

  public async savePDF() {  
    let html: any = document.getElementById('viewPDF');
    html2canvas(html).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'pt', 'a4');

      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)

      pdf.save(`order_n_${this.orderPDF.n_ordine}.pdf`); 

      this.snackBar.open("Documento salvato con successo!", 'OK', {
        horizontalPosition: this.horizontalPosition,
        duration: this.durationInSeconds * 1000
      })
    });
  }  

  goBack() {
    if (this.router.url.includes('vol1')) {
      this.router.navigateByUrl('vol1/home');
    }
    if (this.router.url.includes('vol0')) {
      this.router.navigateByUrl('vol0/home');
    }
  }

  print() {

  }


}

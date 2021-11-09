import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ordine-interno',
  templateUrl: './ordine-interno.component.html',
  styleUrls: ['./ordine-interno.component.css']
})
export class OrdineInternoComponent implements OnInit {

  
  isSidebarOpen= false;

  isLoading = false;

  
  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
  }

}

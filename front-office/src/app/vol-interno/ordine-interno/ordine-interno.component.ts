import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMansionDialogComponent } from '../../change-mansion-dialog/change-mansion-dialog.component';

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

  openDialog() {
    const dialogRef = this.dialog.open(ChangeMansionDialogComponent);
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}

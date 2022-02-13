import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ronda-della-carita';

  openedSubject = new Subject<boolean>();

  collapse = true;

  constructor (
    public router: Router
  ) {}

  ngOnInit() {
  }

  dismissSidebar() {
    this.openedSubject.next(false);
  }
}

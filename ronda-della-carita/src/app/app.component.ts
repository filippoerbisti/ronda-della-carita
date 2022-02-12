import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ronda-della-carita';

  openedSubject = new Subject<boolean>();
  isLogged!: boolean;

  collapse = true;

  ngOnInit() {
    if(window.location.href.includes('login')) {
      this.isLogged = false;
    }
    console.log(this.isLogged);
  }

  dismissSidebar() {
    this.openedSubject.next(false);
  }
}

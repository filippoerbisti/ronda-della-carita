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

  collapse = true;

  dismissSidebar() {
    this.openedSubject.next(false);
  }
}

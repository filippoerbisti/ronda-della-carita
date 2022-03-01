import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { PusherService } from './pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Ronda della Carità';

  openedSubject = new Subject<boolean>();
  
  collapse = true;

  constructor (
    public router: Router
    // private pusherService: PusherService
  ) {}

  ngOnInit() {
    // this.pusherService.channel.bind('new-like', (data: { likes: any; }) => {
    //   this.likes = data.likes ;
    // });
  }

  dismissSidebar() {
    this.openedSubject.next(false);
  }
}

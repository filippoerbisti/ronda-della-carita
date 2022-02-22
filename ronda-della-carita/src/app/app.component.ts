import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { PusherService } from './pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ronda-della-carita';

  openedSubject = new Subject<boolean>();

  likes: any =  10;

  collapse = true;

  constructor (
    public router: Router,
    // private pusherService: PusherService
  ) {}

  ngOnInit() {
    // this.pusherService.channel.bind('new-like', (data: { likes: any; }) => {
    //   this.likes = data.likes ;
    // });
  }

  // liked() {
  //   this.likes = parseInt(this.likes, 10) + 1;
  //   this.pusherService.like( this.likes );
  // }

  dismissSidebar() {
    this.openedSubject.next(false);
  }
}

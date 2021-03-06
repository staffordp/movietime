import { Component, OnInit, Input} from '@angular/core';
import { Theater, Movie} from './../../classes/movie';
import { User } from './../../classes/user';

@Component({
  selector: 'app-theater-item',
  templateUrl: './theater-item.component.html',
  styleUrls: ['./theater-item.component.css']
})
export class TheaterItemComponent implements OnInit {
@Input() theater: Theater;
@Input() user: User;

  constructor() { }

  ngOnInit() {
    console.log(this.theater);
  }

  checkTheater(theater: Theater) {

      // Convert to int
      theater.id = +theater.id;

      if (this.user.theaters == null) {
        return false;
      }

      // console.log(this.user.theaters.indexOf(theater.id));
      if (this.user.theaters.indexOf(theater.id) > -1) {
        return true;
      } else {
        return false;
      }
  }
}

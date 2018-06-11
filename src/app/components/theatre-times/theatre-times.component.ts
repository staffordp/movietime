import { Component, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { Theater } from '../../classes/movie';
import { User } from '../../classes/user';

@Component({
  selector: 'app-theatre-times',
  templateUrl: './theatre-times.component.html',
  styleUrls: ['./theatre-times.component.css']
})
export class TheatreTimesComponent implements OnInit {
  @Input() theater: Theater;
  @Input() user: User;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.log();
    console.log(this.theater);
  }

  toggle(e, id): void {
    // console.log('toggled');
    // console.log(e);
    // console.log(id);
    if (e.checked) {
      this.addTheater(id);
    } else {
      this.removeTheater(id);
    }
    ref.detectChanges();
  }

  addTheater(theater) {
    console.log('adding theater');
    if (this.user.theaters == null) {
      this.user.theaters = [theater];
      // Note: Need to find a way to update all theaters with this checkmark
      theater.checked = true;
      console.log(this.user.theaters);
    } else if (this.user.theaters.indexOf(theater.id)) {
            // console.log('Theater not in list.');
      // console.log('Adding theater ' + theater.id);
      this.user.theaters.push(theater.id);
      theater.checked = true;
    } else {
      // console.log('Already in list');
    }
  }

  removeTheater(theater) {
    const idx = this.user.theaters.indexOf(theater.id);
    console.log(idx);
    if (idx > -1 ) {
      // console.log('Removing theater ' + theater.id);
      this.user.theaters.splice(idx, 1);
      theater.checked = false;
    } else {
      // console.log('Not in list');
    }
  }

  log(): void {
    console.log('theater-times component loaded.')
  }


}

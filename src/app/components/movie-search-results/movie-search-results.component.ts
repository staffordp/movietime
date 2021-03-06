import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { AreaService } from '../../services/area.service';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Area } from '../../classes/area';
import { User } from '../../classes/user';
import { Movie } from '../../classes/movie';
import { Showings } from '../../interfaces/showings';


@Component({
  selector: 'app-movie-search-results',
  templateUrl: './movie-search-results.component.html',
  styleUrls: ['./movie-search-results.component.css']
})
export class MovieSearchResultsComponent implements OnInit {

  area: Area;
  user: User;
  zipcode: number;
  username: string;
  // movies: Movie[];
  _movies: Array<Movie>;

  constructor(
    private apiService: ApiService,
    private areaService: AreaService,
    private movieService: MovieService,
    private userService: UserService,
    private route: ActivatedRoute) {
      this._movies = new Array<Movie>();
    }

  ngOnInit() {
    this.getData();
    this.route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
    });
    this.getArea();
    this.log();
  }

  getData(): void {
    const id = this.route.snapshot.paramMap.get('user');
    // this.userService.getUser(id).subscribe(user => (this.user = user));
    this.userService.getUser(id).subscribe(
      user => this.user = user,
      e => console.log('onError: %s', e),
      () => {
        // console.log('onCompleted');
        this.getMovies()
        .subscribe((data: Showings[]) => {
          this._movies = this.parseMovies(data, this.user.theaters);
          // this._movies = this.movies;
        });
      }
    );
  }

  // Temporary function while outside api calls are enabled
  // getUser() {
  //   this.user = new User(0, 'janedoe@gmail.com', 'Jane', 'Doe', '06902');
  //   this.user.theaters.push('5884');
  // }

  getZipcode(): void {
    this.areaService.getArea(this.zipcode).subscribe(area => (this.area = area));
  }

  getArea(): void {
    this.areaService.getArea(this.zipcode).subscribe(area => (this.area = area));
  }

  getMovies() {
    return this.apiService.getMovies();
  }

  parseMovies(data, theaters) {
    return this.movieService.parseMovies(data, theaters);
  }

  log(): void {
    console.log('movie-search component loaded.');
  }

}

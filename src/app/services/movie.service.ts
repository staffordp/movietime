import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Movie } from '../classes/movie';
import { Theater } from '../classes/theater';
import { Area } from '../classes/area';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MovieService {

  movies: any[] = [];

  constructor(private http: HttpClient,
    private reportService: ReportService) { }

  parseMovies(data: any[]): void {
    // console.log(data);
    this.movies = [];
    let theaters = [];
    let current = Movie;
    for (let movie of data) {
      // console.log(movie.title);
      current = new Movie(movie.title);

      for (let showtime of movie.showtimes) {
        // Check if theater exists, if not create it
        // if (current.theaters.length > 0) {
        let t = current.theaters.filter(x => x.name == showtime.theatre.name);
        // console.log(t);
        if (t.length > 0) {
          // console.log('found');
          // console.log(t);
          t[0].times.push(showtime.dateTime);
        } else {
          // console.log('not found');
          current.theaters.push({
            name: showtime.theatre.name,
            times: [showtime.dateTime]
          });
        }

      }
      this.movies.push(current);
    }
    console.log(this.movies);
  }
}
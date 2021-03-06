import { Injectable } from '@angular/core';

import { Ratings } from '../interfaces/showings';
import { Movie } from '../classes/movie';
import { ReportService } from './report.service';

@Injectable()
export class MovieService {

  movies: Movie[] = [];
  moviePosters: string[] = [];
  movieposter: string;

  constructor(private reportService: ReportService) { }

  parseMovies(showings, theaters) {
    // console.log(showings);
    this.movies = [];
    let movie = {} as Movie;
    for (let x = 0; x < showings.length; x++) {
      const showing = showings[x];
      if (!showing.ratings) {
        const ratings = new Ratings( '', 'N/A' );
        showing.ratings = new Array(ratings);
      }
      if (showing.entityType !== 'Movie') {
        console.log('showing is not a Movie.  Need to add check for Theatre Event.');
        console.log(showing);
      }
      movie = new Movie(
        showing.title,
        showing.subType,
        showing.releaseDate,
        showing.genres,
        showing.directors,
        showing.shortDescription,
        showing.longDescription,
        showing.ratings[0].code,
        showing.advisories,
        showing.runTime
      );
      for (const showtime of showing.showtimes) {
        // Check if theater exists, if not create it
        const s = movie.theaters.filter(t => t.name === showtime.theatre.name);
        let checked = false;
          if (theaters) {
            const idx: number = theaters.indexOf(showtime.theatre.id);
            if (idx > 0 ) {
              checked = true;
            }
          }
        if (s.length > 0) {
          s[0].times.push(showtime.dateTime);
        } else {
          movie.theaters.push({
            name: showtime.theatre.name,
            id: showtime.theatre.id,
            times: [showtime.dateTime],
            checked: checked
          });
        }
      }
      if (showing.topCast) {
          for (const actor of showing.topCast) {
            movie.cast.push({
              name: actor,
              profile: ''
            });
        }
      }
      this.movies.push(movie);
    }
    this.log('Movie parse received');
    return this.movies;
  }

  // Logs the content to the reportService
  private log(content: string) {
    if (!content) { return; }
    this.reportService.addReport( content );
  }

}

class Cast {
  name: string;
  profile: string;
}

export class Theater {
  name: string;
  id: number;
  times: string[];
  checked: boolean;
}

class Video {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export class Movie {
  // public cast: Array<Cast>;
  // public theaters: Array<Theater>;
  // constructor(
  //   sTitle: string,
  //   sSubType: string,
  //   sReleaseData: string,
  //   genres: Array<string>,
  //   cast: Array<any>,
  //   directors: Array<string>,
  //   sShortDescription: string,
  //   sLongDescription: string,
  //   sRated: string,
  //   advisories: Array<string>,
  //   sRunTime: string,
  //   theaters: Array<any>,
  //   sPoster: string,
  //   sVoteAverage: string,
  //   sPopularity: string,
  //   videos: Array<any>[]
  // ) {
  //   this.theaters = theaters.map(theater => new Theater(name, id, times, checked));
    // this.cast = cast.map(cast => new Cast(name, profile));


    constructor(t, st, rd, g, d, sd, ld, r, ad, rt)  {
        this.id = null;
        this.title = t;
        this.subType = st;
        this.releaseDate = rd;
        this.genres = g;
        this.cast = [];
        this.directors = d;
        this.shortDescription = sd;
        this.longDescription = ld;
        this.rated = r;
        this.advisories = ad;
        this.runTime = rt;
        this.theaters = [];
        this.poster = null;
        this.voteAverage = null;
        this.popularity = null;
        this.videos = [];
     }
    id: number;
    title: string;
    subType: string;
    releaseDate: string;
    genres: string[];
    cast: Cast[];
    directors: string[];
    shortDescription: string;
    longDescription: string;
    rated: string;
    advisories: string[];
    runTime: string;
    theaters: Theater[];
    poster: string;
    voteAverage: string;
    popularity: string;
    videos: Video[];
}

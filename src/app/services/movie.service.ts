import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private APIkey: string = "b214031a8024721ce93ad896558c66ec";
  private language: string = "nl";
  private rootURL: string = `https://api.themoviedb.org/3/`;

  constructor(private http: HttpClient) { }

     getMovies(title: string, page: string = "1"){
       return this.http.get<IMovie>(`${this.rootURL}search/movie?api_key=${this.APIkey}&query=${title}&page=${page}`);
     }

     getMovieInfo(Id: string){
       return this.http.get<IMovieInfo>(`${this.rootURL}movie/${Id}?api_key=${this.APIkey}&language=${this.language}`);
     }

     getMovieCredits(Id: string){
      return this.http.get<IMovieCredits>(`${this.rootURL}movie/${Id}/credits?api_key=${this.APIkey}`);
    }

     getNowPlaying(page: string = "1", Region: string = "NL"){ //Met region wordt bedoeld welk land, dit moet worden weergegeven met de ISO 3166-1 code
                                                               //BE voor Belgie, NL voor Nederland. We gebruiken NL omdat de data van BE slecht is
       return this.http.get<IMoviesWithDates>(`${this.rootURL}movie/now_playing?api_key=${this.APIkey}&language=en-US1&region=${Region}&page=${page}`);      
     }

     getUpcomingMovies(page: string = "1"){
       return this.http.get<IMoviesWithDates>(`${this.rootURL}movie/upcoming?api_key=${this.APIkey}&language=${this.language}&page=${page}`)
     }

     getMostPopularMovies(page: string = "1"){
      return this.http.get<IMovie>(`${this.rootURL}discover/movie?sort_by=popularity.desc&api_key=${this.APIkey}&page=${page}&vote_count.gte=500`);
     }

     getMovieReviews(Id: string){
       return this.http.get<IReviews>(`${this.rootURL}movie/${Id}/reviews?api_key=${this.APIkey}`);
     }
}

// getMovie
export interface IResult {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export interface IMovie {
  page: number;
  total_results: number;
  total_pages: number;
  results: IResult[];
}

// getMovieInfo
export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface IMovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//Get nowPlaying
export interface IDates {
  maximum: string;
  minimum: string;
}

export interface IMoviesWithDates {
  results: IResult[];
  page: number;
  total_results: number;
  dates: IDates;
  total_pages: number;
}

//Movie credits
export interface ICast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface ICrew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface IMovieCredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

export interface IReview {
  author: string;
  content: string;
  id: string;
  url: string;
}

export interface IReviews {
  id: number;
  page: number;
  results: IReview[];
  total_pages: number;
  total_results: number;
}
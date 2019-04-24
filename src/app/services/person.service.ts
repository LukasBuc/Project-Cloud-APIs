import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private APIkey: string = "b214031a8024721ce93ad896558c66ec";
  private language: string = "nl"; 

  constructor(private http: HttpClient) { }

  getPersonInfo(personId: string){
    //We pakken de engelse versie omdat de nederlandse geen biografie heeft
    return this.http.get<IPersonInfo>(`https://api.themoviedb.org/3/person/${personId}?api_key=${this.APIkey}&language=en-US`)
  }

  getMovieCredits(personId: string){
    return this.http.get<IMovieCredits>(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${this.APIkey}&language=en-US`)
  }
}

//getPersonInfo
export interface IPersonInfo {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage?: any;
}

//getMovieCredits
export interface ICast {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
}

export interface ICrew {
  id: number;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  video: boolean;
  release_date: string;
  vote_average: number;
  title: string;
  popularity: number;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  poster_path: string;
  credit_id: string;
}

export interface IMovieCredits {
  cast: ICast[];
  crew: ICrew[];
  id: number;
}
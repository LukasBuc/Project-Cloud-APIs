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
    //We sorteren op populariteit
    return this.http.get<IMovieCredits>(`https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&sort_by=vote_average.desc&api_key=${this.APIkey}`);
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
export interface IMovie {
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

export interface IMovieCredits {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovie[];
}
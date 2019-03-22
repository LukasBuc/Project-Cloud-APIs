import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // getMovie(){
  //   return this.http.get<IMovieInfo>('https://api.themoviedb.org/3/search/movie?api_key=b214031a8024721ce93ad896558c66ec&query=Jack+Reacher');
  //   //API-key: b214031a8024721ce93ad896558c66ec
  // }
     getMovie(title: string = "Interstellar"){
       return this.http.get<IMovieInfo>(`https://api.themoviedb.org/3/search/movie?api_key=b214031a8024721ce93ad896558c66ec&query=${title}`)
     }

}

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

export interface IMovieInfo {
  page: number;
  total_results: number;
  total_pages: number;
  results: IResult[];
}
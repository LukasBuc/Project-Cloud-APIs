import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionService {

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films`);
  }

  getMoviesSorted(sortBy: string, direction?: string){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films?sort=${sortBy}&direction=${direction}`);
  }

  getMoviesByTitle(title: string){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films?title=${title}`);
  }

  getDirectors(){
    return this.http.get<IDirector[]>(`http://localhost:64098/api/directors`);
  }
}

export interface IMovieCollection {
  id: number;
  title: string;
  runtime: number;
  year: number;
  genre: string;
  mediaType: string;
  directorId: number;
  director?: any;
}

export interface IDirector {
  id: number;
  name: string;
}

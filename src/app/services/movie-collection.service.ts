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

  // getTotalMovies(){
  //   return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films`);
  // }

  getMovie(id: string){
    return this.http.get<IMovieCollection>(`http://localhost:64098/api/films/${id}`);
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

  getDirectorByName(name: string){
    return this.http.get<IDirector[]>(`http://localhost:64098/api/directors?name=${name}`);
  }

  addDirector(director: IDirector){
    return this.http.put<IDirector>(`http://localhost:64098/api/directors`, director);
  }

  updateMovie(movie: IMovieCollection) {
    return this.http.put<IMovieCollection>(`http://localhost:64098/api/films`, movie);
  }

  addMovie(movie: IMovieCollection){
    return this.http.post<IMovieCollection>(`http://localhost:64098/api/films`, movie);
  }

  deleteMovie(id: string){
    return this.http.delete(`http://localhost:64098/api/films/${id}`);
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
  director?: IDirector;
}

export interface IDirector {
  id: number;
  name: string;
}

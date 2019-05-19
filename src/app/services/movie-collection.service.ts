import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionService {

  API_URL: string = 'http://FilmCollection/api/v2/';

  constructor(private http: HttpClient, public auth: AuthService) { }

  // getMovies(){
  //   return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films`);
  // }
  getMovies(){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  // getTotalMovies(){
  //   return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films`);
  // }

  getMovie(id: string){
    return this.http.get<IMovieCollection>(`http://localhost:64098/api/films/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getMoviesSorted(sortBy: string, direction?: string){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films?sort=${sortBy}&direction=${direction}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getMoviesByTitle(title: string){
    return this.http.get<IMovieCollection[]>(`http://localhost:64098/api/films?title=${title}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getDirectors(){
    return this.http.get<IDirector[]>(`http://localhost:64098/api/directors`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getDirectorByName(name: string){
    return this.http.get<IDirector[]>(`http://localhost:64098/api/directors?name=${name}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  addDirector(director: IDirector){
    return this.http.put<IDirector>(`http://localhost:64098/api/directors`, director, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  updateMovie(movie: IMovieCollection) {
    return this.http.put<IMovieCollection>(`http://localhost:64098/api/films`, movie, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  addMovie(movie: IMovieCollection){
    return this.http.post<IMovieCollection>(`http://localhost:64098/api/films`, movie, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  deleteMovie(id: string){
    return this.http.delete(`http://localhost:64098/api/films/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
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

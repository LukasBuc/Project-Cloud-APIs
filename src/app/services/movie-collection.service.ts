import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionService {

  private rootURL: string = `http://localhost:64098/api/`; 

  constructor(private http: HttpClient, public auth: AuthService) { }

  getMovies(){
    return this.http.get<IMovieCollection[]>(`${this.rootURL}films`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  // getTotalMovies(){
  //   return this.http.get<IMovieCollection[]>(`${this.rootURL}films`);
  // }

  getMovie(id: string){
    return this.http.get<IMovieCollection>(`${this.rootURL}films/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getMoviesSorted(sortBy: string, direction?: string){
    return this.http.get<IMovieCollection[]>(`${this.rootURL}films?sort=${sortBy}&direction=${direction}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getMoviesByTitle(title: string){
    return this.http.get<IMovieCollection[]>(`${this.rootURL}films?title=${title}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getDirectors(){
    return this.http.get<IDirector[]>(`${this.rootURL}directors`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  getDirectorByName(name: string){
    return this.http.get<IDirector[]>(`${this.rootURL}directors?name=${name}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  addDirector(director: IDirector){
    return this.http.put<IDirector>(`${this.rootURL}directors`, director, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  updateMovie(movie: IMovieCollection) {
    return this.http.put<IMovieCollection>(`${this.rootURL}films`, movie, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  addMovie(movie: IMovieCollection){
    return this.http.post<IMovieCollection>(`${this.rootURL}films`, movie, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
    });
  }

  deleteMovie(id: string){
    return this.http.delete(`${this.rootURL}films/${id}`, {
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

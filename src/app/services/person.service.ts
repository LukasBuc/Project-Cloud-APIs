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

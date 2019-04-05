import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieinfoService {

  private id: string = "";
  private searchTitle: string = "";

  constructor() { }

  //user input
  public getsearchTitle(){
    return this.searchTitle;
  }

  public setSearchTitle(input: string){
    this.searchTitle = input;
  }

  //Id
  public getId(){
    return this.id;
  }

  public setId(input: string){
    this.id = input
  }

  //TODO: Poster_path hier bijhouden zodat deze niet veranderd van de engelse versie
  //      naar de nederlandse versie
}

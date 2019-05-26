import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedinfoService {

  private id: string = "";
  private searchTitle: string = "";
  private personId: string = "";
  
  private movieCollectionId: string ="";
  private movieDeleted: Boolean = false;

  private currentPage: string = "0";

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

  //Person Id
  public getPersonId(){
    return this.personId;
  }

  public setPersonId(input: string){
    this.personId = input;
  }

  //MovieCollection Id
  public getMovieCollectionId(){
    return this.movieCollectionId;
  }

  public setMovieCollectionId(input: string){
    this.movieCollectionId = input;
  }

  //Movie deleted
  public getMovieDeleted(){
    return this.movieDeleted;
  }

  public setMovieDeleted(input: Boolean){
    this.movieDeleted = input;
  }
  
  //Current page
  public getCurrentPage(){
    return this.currentPage;
  }

  public setCurrentPage(input: string){
    this.currentPage = input;
  }
}

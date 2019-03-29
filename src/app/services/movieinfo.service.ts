import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieinfoService {

  private id: string = "";

  constructor() { }

  public getId(){
    return this.id;
  }

  public setId(input: string){
    this.id = input
  }
}

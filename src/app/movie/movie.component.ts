import { Component, OnInit, ComponentRef } from '@angular/core';
import { MovieService, IResult, IMovieInfo } from './movie.service';
import { MovieinfoService } from '../movie-info/movieinfo.service';
import { componentFactoryName } from '@angular/compiler';
import { load } from '@angular/core/src/render3';
import { getComponent } from '@angular/core/src/render3/discovery_utils';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieList: IResult[];
  posterList: string[];
  movieInfo: IMovieInfo;
  movieId: string;

  //testList: string[] = ["FILM 1", "FILM 2", "FILM 3", "FILM 4"];

  constructor(private svc: MovieService, private sharedSvc: MovieinfoService) { }

  ngOnInit() {
  }

  searchMovie(userInput: string){
    this.svc.getMovie(userInput).subscribe((result) => {

      this.movieList = result.results;
      //console.table(this.movieList);

      //Lijst van poster url's ophalen en volledig maken
      this.posterList = new Array(result.results.length);
      for (let i = 0; i < result.results.length; i++) {
        this.posterList[i] = 'https://image.tmdb.org/t/p/w300' + result.results[i].poster_path;
      }
    })
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();
    console.log(this.movieId);

    this.sharedSvc.id = this.movieId;
    console.log(this.sharedSvc.id);

    //TODO: Veranderen van pagina zal waarschijnlijk via de Router module moeten gebeuren en dan met: RouterLink: ""

    // this.svc.getMovieInfo(this.movieId).subscribe((result) => {
    //   this.movieInfo = result;
    //   console.log(this.movieInfo);
    // })
  }
}

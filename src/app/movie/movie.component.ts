import { Component, OnInit } from '@angular/core';
import { MovieService, IResult, IMovieInfo } from './movie.service';

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

  constructor(private svc: MovieService) { }

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

    this.svc.getMovieInfo(this.movieId).subscribe((result) => {
      this.movieInfo = result;
      console.log(this.movieInfo);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieService, IMovieInfo, IResult } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  moviePosterUrl: string;

  movieList: IResult[];
  posterList: string[];

  testList: string[] = ["FILM 1", "FILM 2", "FILM 3", "FILM 4"];

  constructor(private svc: MovieService) { }

  ngOnInit() {
    //this.searchMovie();
  }

  searchMovie(userInput: string){
    this.svc.getMovie(userInput).subscribe((result) => {
      //console.table(result);

      this.movieList = result.results;
      console.table(this.movieList);

      //Lijst van poster url's ophalen en volledig maken
      this.posterList = new Array(result.results.length);
      for (let i = 0; i < result.results.length; i++) {
        this.posterList[i] = 'https://image.tmdb.org/t/p/w300' + result.results[i].poster_path;
      }

      // console.table(this.posterList);




      // if(result.results[0] != null){
      //   this.moviePosterUrl =  'https://image.tmdb.org/t/p/w500' + result.results[0].poster_path;
      //   console.log(this.moviePosterUrl);
      // }
      // else{
      //   console.log("Deze film bestaat niet of er kon niets van worden teruggevonden")
      // }
      
    })
  }
}

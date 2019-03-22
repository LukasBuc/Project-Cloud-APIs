import { Component, OnInit } from '@angular/core';
import { MovieService, IMovieInfo } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  moviePosterUrl: string;

  constructor(private svc: MovieService) { }

  ngOnInit() {
    //this.searchMovie();
  }

  searchMovie(userInput: string){
    this.svc.getMovie(userInput).subscribe((result) => {
      console.table(result);

      if(result.results[0] != null){
        this.moviePosterUrl =  'https://image.tmdb.org/t/p/w500' + result.results[0].poster_path;
        console.log(this.moviePosterUrl);
      }
      else{
        console.log("Deze film bestaat niet of er kon niets van worden teruggevonden")
      }
      
    })
  }
}

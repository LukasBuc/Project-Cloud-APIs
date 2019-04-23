import { Component, OnInit } from '@angular/core';
import { MovieService, IResult } from '../services/movie.service';
import { SharedinfoService } from '../services/shared-info.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {
  movieList: IResult[];
  posterList: string[];
  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  constructor(private svc: MovieService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    this.searchUpcomingMovies();
  }

  searchUpcomingMovies(){
    this.svc.getUpcomingMovies().subscribe((result) => {
      this.movieList = result.results;
      console.table(result.results);

      //Lijst van poster url's ophalen en volledig maken
      this.posterList = new Array(result.results.length);
      for(let i = 0; i < result.results.length; i++){

        //TODO: checken of er een poster is, indien niet zelf error poster toevoegen die aangeeft dat er geen poster is
      this.posterList[i] = this.poster_base_url + result.results[i].poster_path;
      }
    })
    //TODO: datum toevoegen wanneer film uitkomt
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();

    this.sharedSvc.setId(this.movieId);
    console.log(this.sharedSvc.getId());
  }
}
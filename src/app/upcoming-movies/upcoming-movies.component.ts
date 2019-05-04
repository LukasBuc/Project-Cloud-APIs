import { Component, OnInit } from '@angular/core';
import { MovieService, IResult, IMoviesWithDates } from '../services/movie.service';
import { SharedinfoService } from '../services/shared-info.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {
  movieList: IResult[];
  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  pages: IMoviesWithDates;

  currenpage: Number = 1;
  numberOfPages: Number;

  constructor(private svc: MovieService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    this.searchUpcomingMovies();
  }

  searchUpcomingMovies(){
    this.svc.getUpcomingMovies(this.currenpage.toString()).subscribe((result) => {
      this.movieList = result.results;
      this.pages = result;
      this.numberOfPages = this.pages.total_results / this.pages.total_pages;

      //Lijst van poster url's ophalen en volledig maken
      for (let i = 0; i < this.movieList.length; i++) {
        this.movieList[i].poster_path = this.poster_base_url + this.movieList[i].poster_path       
      }
    })
    //TODO: datum toevoegen wanneer film uitkomt
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();
    this.sharedSvc.setId(this.movieId);
  }

  paginate(event){
    this.currenpage = parseInt(event.page) + 1;
    this.searchUpcomingMovies();
  }
}

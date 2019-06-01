import { Component, OnInit } from '@angular/core';
import { MovieService, IResult, IMoviesWithDates } from '../services/movie.service';
import { SharedinfoService } from '../services/shared-info.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {
  movieList: IResult[];
  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  currentPage: number = 1;
  numberOfPages: number;
  pages: IMoviesWithDates;

  constructor(private svc: MovieService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    this.searchNowPlaying();
  }

  searchNowPlaying(){
    this.svc.getNowPlaying(this.currentPage.toString()).subscribe((result) => {

        this.movieList = result.results;
        this.pages = result;
        this.numberOfPages = this.pages.total_results / this.pages.total_pages;

        //Lijst van poster url's ophalen en volledig maken
        for (let i = 0; i < this.movieList.length; i++) {
          this.movieList[i].poster_path = this.poster_base_url + this.movieList[i].poster_path;
        }
    })
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();

    this.sharedSvc.setId(this.movieId);
  }

  paginate(event){
    //event.page geeft als eerste pagina 0 terug, maar in de API is de eerste pagina 1
    this.currentPage = parseInt(event.page) + 1;

    this.searchNowPlaying();
  }
}

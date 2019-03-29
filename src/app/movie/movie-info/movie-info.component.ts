import { Component, OnInit, Input } from '@angular/core';
import { MovieinfoService } from '../../services/movieinfo.service';
import { MovieService, IMovieInfo, IGenre } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  movieId: string;
  movieInfo: IMovieInfo;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';
  poster_full_url: string;
  backdrop: string;
  movieTitle: string;
  budget: string;
  imdbLink: string;
  genres: IGenre[];

  constructor(private sharedSvc: MovieinfoService, private movieSvc: MovieService) { }

  ngOnInit() {
    this.movieId = this.sharedSvc.getId();
    // TODO: Als this.sharedSvc.getId() leeg is moet er terug gegaan worden naar de search pagina
    console.log(`Het id van deze film is: ${this.sharedSvc.getId()}`);

    this.movieSvc.getMovieInfo(this.movieId).subscribe((result) => {
      this.movieInfo = result;
      console.table(this.movieInfo);
      this.poster_full_url = this.poster_base_url + this.movieInfo.poster_path;
      this.backdrop = this.poster_base_url + this.movieInfo.backdrop_path;
      this.movieTitle = this.movieInfo.original_title;
      this.budget = this.movieInfo.budget.toString();

      //TODO: Imdb link verder uitwerken als dat gaat
      this.imdbLink = this.movieInfo.imdb_id;

      this.genres = this.movieInfo.genres;
    })

    
  }

}

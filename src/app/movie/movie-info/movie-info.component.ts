import { Component, OnInit, Input } from '@angular/core';
import { MovieinfoService } from '../../services/movieinfo.service';
import { MovieService, IMovieInfo, IGenre } from 'src/app/services/movie.service';
import { RouterLink, Router } from '@angular/router';

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

  constructor(private sharedSvc: MovieinfoService, private movieSvc: MovieService, private router: Router) { }

  ngOnInit() {
    this.movieId = this.sharedSvc.getId();
    
    //Als er geen movie id is (geen film geselecteerd) wordt er terug naar de search pagina verwezen
    if(this.movieId == ""){
      this.router.navigate(['search']);
      console.log("geen id gevonden, terug naar search!");
    }
    else{
      console.log(`Het id van deze film is: ${this.sharedSvc.getId()}`);

      this.movieSvc.getMovieInfo(this.movieId).subscribe((result) => {
        this.movieInfo = result;
        console.table(this.movieInfo);
        this.poster_full_url = this.poster_base_url + this.movieInfo.poster_path;
        this.backdrop = this.poster_base_url + this.movieInfo.backdrop_path;
        this.movieTitle = this.movieInfo.original_title;
        this.budget = this.movieInfo.budget.toString();
        this.genres = this.movieInfo.genres;

        //TODO: Imdb link verder uitwerken als dat gaat
        this.imdbLink = this.movieInfo.imdb_id;
  
        //TODO: description van film toevoegen, noemt "overview" in de tabel
      })
    }  
  }
}

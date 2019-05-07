import { Component, OnInit, Input } from '@angular/core';
import { SharedinfoService } from '../services/shared-info.service';
import { MovieService, IMovieInfo, IGenre, ICast, IReview } from 'src/app/services/movie.service';
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
  movieTitle: string;
  budget: string;
  genres: IGenre[];
  description: string;
  releaseDate: string;

  //Credits
  actors: ICast[];
  actorImgBaseUrl: string = 'https://image.tmdb.org/t/p/w200';

  reviews: IReview[];

  constructor(private sharedSvc: SharedinfoService, private movieSvc: MovieService, private MovieCredits: MovieService, private router: Router) { }

  ngOnInit() {
    this.movieId = this.sharedSvc.getId();
    
    //Als er geen movie id is (geen film geselecteerd) wordt er terug naar de search pagina verwezen
    if(this.movieId == ""){
      this.router.navigate(['search']);
      console.log("geen id gevonden, terug naar search!");
    }
    else{
      console.log(`Het id van deze film is: ${this.sharedSvc.getId()}`);

      this.getMovieInfo();
      this.getMovieCredits();
      this.getReviews();      
    }  
  }

  getActorId(actor: ICast){
    this.sharedSvc.setPersonId(actor.id.toString());
    console.log(this.sharedSvc.getPersonId());
  }

  getReviews(){
    this.movieSvc.getMovieReviews(this.movieId).subscribe((result) => {
      this.reviews = result.results;
      console.table(this.reviews);
    })
  }

  getMovieInfo(){
    this.movieSvc.getMovieInfo(this.movieId).subscribe((result) => {
      this.movieInfo = result;

      this.poster_full_url = this.poster_base_url + this.movieInfo.poster_path;
      this.movieTitle = this.movieInfo.original_title;
      this.budget = this.movieInfo.budget.toString();
      this.description = this.movieInfo.overview;
      this.genres = this.movieInfo.genres;
      this.releaseDate = this.movieInfo.release_date;
    })
  }

  getMovieCredits(){
    this.MovieCredits.getMovieCredits(this.movieId).subscribe((result) => {
      //Acteurs in lijst steken
      this.actors = new Array(result.cast.length);
      for (let i = 0; i < result.cast.length; i++) {
        this.actors[i] = result.cast[i];
        
        //profile_path aanpassen naar volledige url
        this.actors[i].profile_path = this.actorImgBaseUrl + this.actors[i].profile_path; 
      }
    })
  }
}

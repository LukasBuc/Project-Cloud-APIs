import { Component, OnInit } from '@angular/core';
import { SharedinfoService } from '../services/shared-info.service';
import { PersonService, IPersonInfo, IMovieCredits, IMovie } from '../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  personInfo: IPersonInfo;
  MovieCredits: IMovieCredits;

  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  constructor(private sharedSvc: SharedinfoService, private personSvc: PersonService, private router: Router) { }

  ngOnInit() {
    if(this.sharedSvc.getPersonId() != ""){
      this.searchPersonDetails();
      this.searchMovieCredits();
    }
    else{
      console.log("Geen persoon id gevonden terug naar search!")
      this.router.navigate(['search']);
    }
  }

  searchPersonDetails(){
    this.personSvc.getPersonInfo(this.sharedSvc.getPersonId()).subscribe((result) => {
      this.personInfo = result;

      this.personInfo.profile_path = this.poster_base_url + this.personInfo.profile_path;
    })
  }

  searchMovieCredits(){
    this.personSvc.getMovieCredits(this.sharedSvc.getPersonId()).subscribe((result) => {
      this.MovieCredits = result;

      for (let i = 0; i < result.results.length; i++) {
        this.MovieCredits.results[i].poster_path = this.poster_base_url + this.MovieCredits.results[i].poster_path;
      }
    })
  }

  getMovieId(movie: IMovie){
    this.movieId = movie.id.toString();
    this.sharedSvc.setId(this.movieId);
  }
}

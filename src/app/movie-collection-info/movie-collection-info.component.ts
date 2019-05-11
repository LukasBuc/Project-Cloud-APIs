import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection } from '../services/movie-collection.service';
import { SharedinfoService } from '../services/shared-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-collection-info',
  templateUrl: './movie-collection-info.component.html',
  styleUrls: ['./movie-collection-info.component.css']
})
export class MovieCollectionInfoComponent implements OnInit {

  movieId: string;
  movieInfo: IMovieCollection;

  editInfoDisabled: Boolean = true;

  director: string;
  runtime: string;
  mediaType: string;
  genre: string;
  year: string;
  title: string;

  directorId: number;


  updatedMovie: IMovieCollection;

  constructor(private svc: MovieCollectionService, private sharedSvc: SharedinfoService, private router: Router) { }

  ngOnInit() {
    if(this.sharedSvc.getMovieCollectionId() != "")
    {     
      this.searchMovie();
    }
    else{
      console.log("Geen id gevonden, terug naar collectie!");
      this.router.navigate(['myCollection']);
    }
      
  }

  searchMovie(){    
      this.movieId = this.sharedSvc.getMovieCollectionId();
      this.svc.getMovie(this.movieId).subscribe((result) => {
            this.movieInfo = result;
            this.director = result.director.name;
            this.runtime = result.runtime.toString();
            this.mediaType = result.mediaType;
            this.genre = result.genre;
            this.year = result.year.toString();
            this.title = result.title;
            
            this.directorId = result.directorId;
            this.updatedMovie = result;
      })
  }

  editInfo(){
    this.editInfoDisabled = !this.editInfoDisabled;
  }

  saveChanges(){
    this.updatedMovie.title = this.title;
    this.updatedMovie.year = parseInt(this.year);
    this.updatedMovie.runtime = parseInt(this.runtime);
    this.updatedMovie.mediaType = this.mediaType;
    this.updatedMovie.genre = this.genre;
    this.updatedMovie.director.name = this.director;

    this.updatedMovie.directorId = this.directorId;
    this.updatedMovie.id = parseInt(this.movieId);

    this.svc.updateFilm(this.updatedMovie).subscribe();

    this.editInfoDisabled = !this.editInfoDisabled;
  }

  //TODO: ZELF EEN FILM TOEVOEGEN
  //      EN EEN FILM VERWIJDEREN
}

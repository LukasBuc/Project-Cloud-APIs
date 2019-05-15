import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection } from '../services/movie-collection.service';
import { SharedinfoService } from '../services/shared-info.service';
import { Router } from '@angular/router';
import { resetComponentState } from '@angular/core/src/render3/state';

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

  updatedMovie: MovieCollection = new MovieCollection();
  newMovie: MovieCollection = new MovieCollection();
  newDirector: Director = new Director();

  testFUCKINGDING: IMovieCollection[];

  changesButtonDisabled: Boolean = false;
  saveChangesButtonDisabled: Boolean = true;
  newMovieButtonDisabled: Boolean = false;
  saveNewMovieButtonDisabled: Boolean = true;
  deleteMovieButtonDisabled: Boolean = false;

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
      })
  }

  saveChanges(){
    this.updatedMovie.title = this.title;
    this.updatedMovie.year = parseInt(this.year);
    this.updatedMovie.runtime = parseInt(this.runtime);
    this.updatedMovie.mediaType = this.mediaType;
    this.updatedMovie.genre = this.genre;
    //this.updatedMovie.director.name = this.director;

    this.updatedMovie.directorId = this.directorId;
    this.updatedMovie.id = parseInt(this.movieId);

    this.svc.updateMovie(this.updatedMovie).subscribe();

    //Inputs en buttons terug enablen/disablen
    this.reset();
  }

  addMovie(){
    this.newMovie.title = this.title;
    this.newMovie.year = parseInt(this.year);
    this.newMovie.runtime = parseInt(this.runtime);
    this.newMovie.mediaType = this.mediaType;
    this.newMovie.genre = this.genre;

    let temporaryDirectorName = this.director;
    this.svc.getDirectorByName(temporaryDirectorName).subscribe((result) => {

      if(result[0] != undefined)
      {
        //Director bestond al, verder gaan met aanmaken film
        this.newMovie.directorId = result[0].id;
        this.directorId = this.newMovie.directorId;
        this.svc.addMovie(this.newMovie).subscribe((createdResult) => {
          //nieuwe movie Id doorgeven
          this.movieId = createdResult.id.toString();
        });
      }
      else{
        //Nieuwe director aanmaken
        this.newDirector.name = temporaryDirectorName;
        this.svc.addDirector(this.newDirector).subscribe((result) => {

          //nieuw aangemaakte director id opvragen
          this.newMovie.directorId = result.id;

          this.svc.addMovie(this.newMovie).subscribe((createdResult) => {
            //nieuwe movie Id doorgeven
            this.movieId = createdResult.id.toString();
          });
      });  
      }
    })


    this.reset();
  }

  deleteMovie(){
    this.svc.deleteMovie(this.movieId).subscribe();
    this.router.navigate(['myCollection']);
    //TODO: popup message ofzo dat zegt dat de film verwijderd is
  }

  clearInput(){
    this.director = "";
    this.runtime = "";
    this.mediaType = "";
    this.genre = "";
    this.year = "";
    this.title = "";
  }

  startChanges(){
    //Button enable/disable
    this.changesButtonDisabled = true;
    this.saveChangesButtonDisabled = false;
    this.newMovieButtonDisabled = true;
    this.deleteMovieButtonDisabled = true;

    //Input enable
    this.editInfoDisabled = false;
  }

  startNewMovie(){
    this.clearInput();
    this.editInfoDisabled = false;
    this.saveNewMovieButtonDisabled = false;

    this.changesButtonDisabled = true;
    this.saveChangesButtonDisabled = true;
    this.deleteMovieButtonDisabled = true;
  }

  reset(){
    this.changesButtonDisabled = false;
    this.saveChangesButtonDisabled = true;
    this.newMovieButtonDisabled = false;
    this.saveNewMovieButtonDisabled = true;
    this.deleteMovieButtonDisabled = false;

    this.editInfoDisabled = true;
  }
}

class MovieCollection {
  id: number;
  title: string;
  runtime: number;
  year: number;
  genre: string;
  mediaType: string;
  directorId: number;
  director?: any;
}

class Director {
  id: number;
  name: string;
}

//WERKT
// {
// 	"title": "testFilm",
// 	"runtime": 120,
// 	"year": 2303,
// 	"genre": "action",
// 	"mediaType": "DVD",
// 	"directorId": 5
// }
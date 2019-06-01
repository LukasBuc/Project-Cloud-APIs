import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection, IDirector } from '../services/movie-collection.service';
import { SharedinfoService } from '../services/shared-info.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.css']
})
export class MovieCollectionComponent implements OnInit {

  myCollection: IMovieCollection[];
  directors: IDirector[];

  sortOptions: SelectItem[];

  userInput: string;
  movieId: string;

  totalPages: number;
  totalResults: number;

  constructor(private movieCollectionSvc: MovieCollectionService, private sharedSvc: SharedinfoService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {

    //Er moet worden gewacht anders wordt het toast bericht niet getoond
    setTimeout(() => {  
      if (this.sharedSvc.getMovieDeleted()) {
        this.showDeleted();    
        this.sharedSvc.setMovieDeleted(false);
      }
      console.log("Films wordgen ingeladen");
      this.getMovies();
    });
    
    this.sortOptions = [
      {label: 'Titel', value: 0},
      {label: 'Jaar', value: 1},
      {label: 'Genre', value: 2}
    ];
  }

  showDeleted(){
    this.messageService.add({severity:'info', summary: 'Film verwijderd', detail: 'De film is uit je collectie verwijderd'});
  }

  getMovies(){
    this.movieCollectionSvc.getMovies().subscribe((result) => {
        this.myCollection = result;
    }, (err) => {
      console.log("Unauthorized access");
    })
  }

  getMoviesSorted(sortBy: string, direction?: string){
    this.movieCollectionSvc.getMoviesSorted(sortBy, direction).subscribe((result) => {
      this.myCollection = result;
    }, (err) => {
      console.log("Unauthorized access");
    })
  }

  getMovieByTitle(){
    this.movieCollectionSvc.getMoviesByTitle(this.userInput).subscribe((result) => {
      this.myCollection = result;
    }, (err) => {
      console.log("Unauthorized access");
    })
  }

  onSortChange(event) {
    let value = event.value;

    switch (value) {
      case 0:
        //sorteren op titel
        this.getMoviesSorted("title", "asc");
        break;
      case 1:
        //sorteren op jaar
        this.getMoviesSorted("year", "asc");
        break;
      case 2:
        //Sorteren op genre
        this.getMoviesSorted("genre", "asc");
        break;    
      default:
        break;
    }
  }

  selectMovie(movie: IMovieCollection){
    this.sharedSvc.setMovieCollectionId(movie.id.toString());
  }

  addMovie(){
    this.sharedSvc.setMovieCollectionId("");
    this.router.navigate(['collectionInfo']);
  }
}

interface SelectItem {
  label: string;
  value: number;
}

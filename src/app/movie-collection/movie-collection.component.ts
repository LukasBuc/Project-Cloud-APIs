import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection, IDirector } from '../services/movie-collection.service';
import { SharedinfoService } from '../services/shared-info.service';
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

 

  constructor(private movieCollectionSvc: MovieCollectionService, private sharedSvc: SharedinfoService, private messageService: MessageService) { 

  }

  ngOnInit() {

    //Er moet worden gewacht anders wordt het toast bericht niet getoond
    setTimeout(() => {  
      if (this.sharedSvc.getMovieDeleted()) {
        this.showInfo();    
        this.sharedSvc.setMovieDeleted(false);
      }
    });
    
    this.getMovies();

    this.sortOptions = [
      {label: 'Titel', value: 0},
      {label: 'Jaar', value: 1},
      {label: 'Genre', value: 2}
    ];

  }

  showInfo(){
    this.messageService.add({severity:'info', summary: 'Info message', detail: 'Film verwijderd'});
    console.log("info moet worden getoond");
  }

  getMovies(){
    this.movieCollectionSvc.getMovies().subscribe((result) => {
        this.myCollection = result;
    })
  }

  getMoviesSorted(sortBy: string, direction?: string){
    this.movieCollectionSvc.getMoviesSorted(sortBy, direction).subscribe((result) => {
      this.myCollection = result;
    })
  }

  getMovieByTitle(){
    this.movieCollectionSvc.getMoviesByTitle(this.userInput).subscribe((result) => {
      this.myCollection = result;
    })
  }

  onSortChange(event) {
    let value = event.value;

    console.log(value);

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
    console.log(this.sharedSvc.getMovieCollectionId());
    //TODO: Naar geselecteerde film gaan zodat deze kan worden aangepast of verwijderd
  }
}

interface SelectItem {
  label: string;
  value: number;
}

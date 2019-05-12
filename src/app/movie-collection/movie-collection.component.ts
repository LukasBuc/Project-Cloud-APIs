import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection, IDirector } from '../services/movie-collection.service';
import { SharedinfoService } from '../services/shared-info.service';

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
 

  constructor(private movieCollectionSvc: MovieCollectionService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    this.getMovies();

    this.sortOptions = [
      {label: 'Titel', value: 0},
      {label: 'Jaar', value: 1},
      {label: 'Genre', value: 2}
  ];
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

  // PAGING TOEVOEGEN 
  // PAGING TOEVOEGEN 
  // PAGING TOEVOEGEN 

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

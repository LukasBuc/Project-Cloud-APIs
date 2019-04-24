import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieService, IResult, IMostPopularMovies} from '../services/movie.service';
import { SharedinfoService } from '../services/shared-info.service'
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieList: IResult[];
  movieId: string;
  pages: IMostPopularMovies;
  currentPage: string = "1";
  temporaryPageNr: number;

  numberOfPages: number;
  previousSearch: string = "";

  //Deze boolean is er om te kijken welke zoek functie moet worden uitgevoerd (populaire films of userinput zoeken)
  searchedMovie: boolean = false;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  //testList: string[] = ["FILM 1", "FILM 2", "FILM 3", "FILM 4"];

  constructor(private svc: MovieService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    if(this.sharedSvc.getsearchTitle() != ""){
      this.searchMovie(this.sharedSvc.getsearchTitle());
    }
    else{
      this.searchMostPopularMovie();
    }
  }

  searchMovie(userInput: string){
    if(userInput != ""){
      
      

      //Als er nog niet gezocht is naar een film boolean op true zetten en huidige paginanummer resetten
      if (!this.searchedMovie) {
        this.searchedMovie = true;
        this.currentPage = "1";
      }

      if(this.previousSearch != userInput){
        this.previousSearch = userInput;
        this.currentPage = "1";
      }

      this.svc.getMovies(userInput, this.currentPage).subscribe((result) => {

        this.movieList = result.results;
        this.pages = result;
        this.numberOfPages =  (this.pages.total_results / this.pages.total_pages);

        this.sharedSvc.setSearchTitle(userInput);
        
  
        //Lijst van poster url's ophalen en volledig maken
        for (let i = 0; i < result.results.length; i++) {  
          //TODO: checken of er een poster is, indien niet zelf error poster toevoegen die aangeeft dat er geen poster is
          this.movieList[i].poster_path = this.poster_base_url + this.movieList[i].poster_path;
        }
      })
    }
  }

  searchMostPopularMovie(){
    //Als er al wel gezocht is naar een film boolean op false zetten en huidige paginanummer resetten
    if (this.searchedMovie) {
      this.searchedMovie = false;
      this.currentPage = "1";
    }

    this.svc.getMostPopularMovies(this.currentPage).subscribe((result) => {
      
      this.movieList = result.results;
      this.pages = result;
      this.numberOfPages =  (this.pages.total_results / this.pages.total_pages);

      for (let i = 0; i < result.results.length; i++) {
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
     this.temporaryPageNr = parseInt(event.page);
     this.temporaryPageNr++
     this.currentPage = this.temporaryPageNr.toString();

     console.log(event.rows);

    if(!this.searchedMovie){
      this.searchMostPopularMovie();
    }
    else{
      this.searchMovie(this.sharedSvc.getsearchTitle());
    }   
  }
}

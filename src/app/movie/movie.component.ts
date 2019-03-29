import { Component, OnInit } from '@angular/core';
import { MovieService, IResult, IMovieInfo } from '../services/movie.service';
import { MovieinfoService } from '../services/movieinfo.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieList: IResult[];
  posterList: string[];
  movieInfo: IMovieInfo;
  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';


  //testList: string[] = ["FILM 1", "FILM 2", "FILM 3", "FILM 4"];

  constructor(private svc: MovieService, private sharedSvc: MovieinfoService) { }

  ngOnInit() {
    if(this.sharedSvc.getsearchTitle() != ""){
      this.searchMovie(this.sharedSvc.getsearchTitle());
    }
  }

  searchMovie(userInput: string){
    this.svc.getMovie(userInput).subscribe((result) => {

      this.movieList = result.results;
      //console.table(this.movieList);
      this.sharedSvc.setSearchTitle(userInput);
      

      //Lijst van poster url's ophalen en volledig maken
      this.posterList = new Array(result.results.length);
      for (let i = 0; i < result.results.length; i++) {
        this.posterList[i] = this.poster_base_url + result.results[i].poster_path;
      }
    })
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();

    //this.sharedSvc.id = this.movieId;
    this.sharedSvc.setId(this.movieId);
    console.log(this.sharedSvc.getId());

    //TODO: Veranderen van pagina zal waarschijnlijk via de Router module moeten gebeuren en dan met: RouterLink: ""

    // this.svc.getMovieInfo(this.movieId).subscribe((result) => {
    //   this.movieInfo = result;
    //   console.log(this.movieInfo);
    // })
  }
}

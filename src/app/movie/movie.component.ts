import { Component, OnInit } from '@angular/core';
import { MovieService, IResult} from '../services/movie.service';
import { SharedinfoService } from '../services/shared-info.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieList: IResult[];
  posterList: string[];
  movieId: string;

  poster_base_url: string = 'https://image.tmdb.org/t/p/w300';

  //testList: string[] = ["FILM 1", "FILM 2", "FILM 3", "FILM 4"];

  constructor(private svc: MovieService, private sharedSvc: SharedinfoService) { }

  ngOnInit() {
    if(this.sharedSvc.getsearchTitle() != ""){
      this.searchMovie(this.sharedSvc.getsearchTitle());
    }
  }

  searchMovie(userInput: string){
    this.svc.getMovie(userInput).subscribe((result) => {

      this.movieList = result.results;
      this.sharedSvc.setSearchTitle(userInput);
      
      console.table(result.results[0]);

      //Lijst van poster url's ophalen en volledig maken
      this.posterList = new Array(result.results.length);
      for (let i = 0; i < result.results.length; i++) {

        //TODO: checken of er een poster is, indien niet zelf error poster toevoegen die aangeeft dat er geen poster is
        this.posterList[i] = this.poster_base_url + result.results[i].poster_path;
      }
    })
  }

  getMovieId(listIndex: number){
    this.movieId = this.movieList[listIndex].id.toString();

    this.sharedSvc.setId(this.movieId);
    console.log(this.sharedSvc.getId());
  }
}

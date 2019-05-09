import { Component, OnInit } from '@angular/core';
import { MovieCollectionService, IMovieCollection } from '../services/movie-collection.service';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.css']
})
export class MovieCollectionComponent implements OnInit {

  myCollection: IMovieCollection[];

  constructor(private movieCollectionSvc: MovieCollectionService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movieCollectionSvc.getMovies().subscribe((result) => {
        this.myCollection = result;
        console.table(this.myCollection);
    })
  }
}

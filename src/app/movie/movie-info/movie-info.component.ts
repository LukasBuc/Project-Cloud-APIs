import { Component, OnInit, Input } from '@angular/core';
import { MovieinfoService } from '../../services/movieinfo.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  movieId: string;

  constructor(private sharedSvc: MovieinfoService) { }

  ngOnInit() {
    this.movieId = this.sharedSvc.getId();
    console.log(`Het id van deze film is: ${this.sharedSvc.getId()}`);    
  }

}

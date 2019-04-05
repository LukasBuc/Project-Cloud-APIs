import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { MovieComponent } from './movie/movie.component';
import { MovieInfoComponent } from './movie/movie-info/movie-info.component';
import { MovieinfoService } from './services/movieinfo.service';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieInfoComponent,
    TabMenuComponent,
    NowPlayingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    PanelModule,
    InputTextModule,
    TabMenuModule,
    RouterModule.forRoot([
      { path: "search", component: MovieComponent},
      { path: "info", component: MovieInfoComponent},
      { path: "nowPlaying", component: NowPlayingComponent},
      { path: "", redirectTo: "search", pathMatch: "full"}
    ])
  ],
  providers: [
    MovieService,
    MovieinfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

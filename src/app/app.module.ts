import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { PaginatorModule } from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';
import { DataScrollerModule } from 'primeng/datascroller';
import { DataViewModule } from 'primeng/dataview';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { MovieComponent } from './movie/movie.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { SharedinfoService } from './services/shared-info.service';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { PersonService } from './services/person.service';
import { PersonInfoComponent } from './person-info/person-info.component';
import { MovieCollectionComponent } from './movie-collection/movie-collection.component';
import { MovieCollectionService } from './services/movie-collection.service';
import { MovieCollectionInfoComponent } from './movie-collection-info/movie-collection-info.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieInfoComponent,
    TabMenuComponent,
    NowPlayingComponent,
    UpcomingMoviesComponent,
    PersonInfoComponent,
    MovieCollectionComponent,
    MovieCollectionInfoComponent
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
    PaginatorModule,
    CarouselModule,
    DataScrollerModule,
    DataViewModule,
    InputMaskModule,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule,
    TooltipModule,
    RouterModule.forRoot([
      { path: "search", component: MovieComponent},
      { path: "info", component: MovieInfoComponent},
      { path: "nowPlaying", component: NowPlayingComponent},
      { path: "upcomingMovies", component: UpcomingMoviesComponent},
      { path: "personInfo", component: PersonInfoComponent },
      { path: "myCollection", component: MovieCollectionComponent },
      { path: "collectionInfo", component: MovieCollectionInfoComponent },
      { path: "", redirectTo: "search", pathMatch: "full"}
    ]) 
  ],
  providers: [
    MovieService,
    SharedinfoService,
    PersonService,
    MovieCollectionService,
    ConfirmationService,
    MessageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

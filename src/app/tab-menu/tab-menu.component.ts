import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Zoeken', icon: 'pi pi-search', routerLink: ['/search']},
            {label: 'Nu in de cinema', icon: 'pi pi-image', routerLink: ['/nowPlaying']},
            {label: 'Binnekort in de cinema', icon: 'pi pi-angle-double-right', routerLink: ['/upcomingMovies']},
            {label: 'Mijn collectie', icon: 'pi pi-folder-open', routerLink: ['/myCollection']}
        ];
    }
}

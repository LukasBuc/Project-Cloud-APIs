import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

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
            {label: 'Home', icon: 'pi pi-home'},
            {label: 'Search', icon: 'pi pi-search', routerLink: ['/search']},
            {label: 'NowPlaying', icon: 'pi pi-image', routerLink: ['/nowPlaying']}
        ];
    }
}

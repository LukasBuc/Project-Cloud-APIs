import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedinfoService } from '../services/shared-info.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  constructor(private sharedSvc: SharedinfoService) { }

  items: MenuItem[];

  activeItem: MenuItem;


    ngOnInit() {
        this.items = [
            {label: 'Zoeken', icon: 'pi pi-search', routerLink: ['/search'], command: (event) => {
              this.saveCurrentPage(event.item.routerLink[0]);
            }},
            {label: 'Nu in de cinema', icon: 'pi pi-image', routerLink: ['/nowPlaying'], command: (event) => {
              this.saveCurrentPage(event.item.routerLink[0]);
            }},
            {label: 'Binnekort in de cinema', icon: 'pi pi-angle-double-right', routerLink: ['/upcomingMovies'], command: (event) => {
              this.saveCurrentPage(event.item.routerLink[0]);
            }},
            {label: 'Mijn collectie', icon: 'pi pi-folder-open', routerLink: ['/myCollection'], command: (event) => {
              this.saveCurrentPage(event.item.routerLink[0]);
            }}
        ];
        this.activeItem = this.items[0];
    }

  saveCurrentPage(input: string){
    this.sharedSvc.setCurrentPage(input);
    console.log(this.sharedSvc.getCurrentPage());
  }
}

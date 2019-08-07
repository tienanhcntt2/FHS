import { Component, ViewChild, OnInit } from '@angular/core';
import { HomeComponent } from './wind/home/home.component';
import { LanguageService } from './service/language.service';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
   
  title = 'WindRose';
  constructor(private languageService: LanguageService,public sidebarservice: SidebarService){

  }
  ngOnInit(){
    this.languageService.setInitState();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
}

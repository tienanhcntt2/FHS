import { Component, ViewChild, OnInit } from '@angular/core';
import { HomeComponent } from './wind/home/home.component';
import { LanguageService } from './service/language.service';
import { Title } from '@angular/platform-browser';
import { AppServiceService } from './service/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
   
  title = 'Weather';
  constructor(private languageService: LanguageService,private titleService: Title,private appService: AppServiceService){

  }
  ngOnInit(){
    this.languageService.setInitState();
    this.titleService.setTitle(this.title);
  }
  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }
}

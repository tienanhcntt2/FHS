import { Component, ViewChild, OnInit } from '@angular/core';
import { HomeComponent } from './wind/home/home.component';
import { LanguageService } from './service/language.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
   
  title = 'Weather';
  constructor(private languageService: LanguageService,private titleService: Title){

  }
  ngOnInit(){
    this.languageService.setInitState();
    this.titleService.setTitle(this.title);
  }

}

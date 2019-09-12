import { Component,OnInit } from '@angular/core';
import { LanguageService } from './service/language.service';
import { Title } from '@angular/platform-browser';
import { AppServiceService } from './service/app-service.service';
import { FhsAuthorizeService } from '@fhs/authorize';
import { AutherService } from './service/autherService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
   
  title = 'Weather';
  constructor(private languageService: LanguageService,private titleService: Title,private appService: AppServiceService, private authFHS: FhsAuthorizeService,
    private authService: AutherService){

  }
  ngOnInit(){
    this.getToken();
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
  private  getToken(){
    console.log("ddsds : " + this.authFHS.AccessToken);
    if(this.authFHS.AccessToken.length >0){
      this.authService.savetoken(this.authFHS.AccessToken);
    }
  }
}

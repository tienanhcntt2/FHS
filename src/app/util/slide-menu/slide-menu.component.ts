import { Component, OnInit } from '@angular/core';

import { Menu } from 'src/app/model/menu';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { CommonService } from 'src/app/service/CommonService';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent implements OnInit {
  // menu
  public listmenu: Menu[] = [];
  public activeState: string ;
  public numberPosition :number;
  private subscription: Subscription;
  //Contrustor
  constructor(private translate: TranslateService, private router:Router, private appService: AppServiceService, private comService: CommonService ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) =>{
      this.addListMenu();
    });

  }
  

  ngOnInit() {
  
    this.addListMenu();
    this.receviedData();
  }
  private addListMenu() {

    this.listmenu = [
      { id: 0, icon: "assets/image/today.png", title: this.translate.instant("menu.home"), path: "/home" },
      { id: 1, icon: "assets/image/rain.png", title: this.translate.instant("home.rainfall"), path: "/rainfall" },
      { id: 2, icon: "assets/image/windspd.png", title: this.translate.instant("home.windspeed"), path: "/speed" },
      { id: 3, icon: "assets/image/winddec.png", title: this.translate.instant("home.winddriction"), path: "/direction" },
      { id: 4, icon: "assets/image/temp.png", title:  this.translate.instant("menu.Temperature"), path: "/temperature" },
      { id: 5, icon: "assets/image/hum.png", title: this.translate.instant("home.Humidity"), path: "/humidity" }
    ];
  }
  sendUrl(i){
    this.numberPosition = i;
    this.activeState = this.listmenu[i].title;
    this.router.navigateByUrl(this.listmenu[i].path);
    this.appService.isSidebarPinned = true;
    this.appService.isSidebarToggeled = false;
    this.comService.notifyOther({option:"menu",value:"assets/image/icon_menu.png"});
  }
  private receviedData(){
    this.subscription = this.comService.notifyObservable$.subscribe((res) => {
      if(res.hasOwnProperty("option") && res.option ==="numberMenu"){
        this.numberPosition = res.value;
        this.activeState =this.listmenu[this.numberPosition].title;
       
      }
    });
  }
}

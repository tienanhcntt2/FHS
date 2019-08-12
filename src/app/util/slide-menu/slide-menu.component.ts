import { Component, OnInit } from '@angular/core';

import { Menu } from 'src/app/model/menu';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';


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
  //Contrustor
  constructor(private translate: TranslateService, private router:Router) {
    translate.onLangChange.subscribe((event: LangChangeEvent) =>{
      this.addListMenu();
    });

  }
  

  ngOnInit() {
    this.addListMenu();
  }
  private addListMenu() {

    this.listmenu = [
      { id: 0, icon: "assets/image/today.png", title: this.translate.instant("menu.home"), path: "/wind/home" },
      { id: 1, icon: "assets/image/rain.png", title: this.translate.instant("home.rainfall"), path: "/wind/rainfall" },
      { id: 2, icon: "assets/image/windspd.png", title: this.translate.instant("home.windspeed"), path: "/wind/speed" },
      { id: 3, icon: "assets/image/winddec.png", title: this.translate.instant("home.winddriction"), path: "/wind/direction" },
      { id: 4, icon: "assets/image/temp.png", title:  this.translate.instant("menu.Temperature"), path: "/wind/temperature" },
      { id: 5, icon: "assets/image/hum.png", title: this.translate.instant("home.Humidity"), path: "/wind/humidity" }
    ];
    this.activeState =this.listmenu[this.numberPosition].title;
  }
  sendUrl(i){
    this.numberPosition = i;
    this.activeState = this.listmenu[i].title;
    this.router.navigateByUrl(this.listmenu[i].path);
  }
}

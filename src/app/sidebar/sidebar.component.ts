import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../service/sidebar.service';

import { Menu } from '../model/menu';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
   animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  
  public listmenu: Menu[] = [];
  public activeState: string ;
  menus = [];
  constructor(public sidebarservice: SidebarService,private translate: TranslateService, private router:Router) {
    this.menus = sidebarservice.getMenuList();
    translate.onLangChange.subscribe((event: LangChangeEvent) =>{
      this.addListMenu();
    });
   }

  ngOnInit() {
    this.addListMenu();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
  clickCloseMenu(){
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
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
    this.activeState =this.listmenu[0].title;
  }
  setStateAsActive(i){
    this.activeState = this.listmenu[i].title;
    this.router.navigateByUrl(this.listmenu[i].path);
  }
}
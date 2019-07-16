import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/CommonService';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private subscription: Subscription;


  // menu click open
  icon_val: string = "../../assets/image/icon_menu.png";
  title: string = "Home";
  public txt_start_date: string = "2019/03/03T00:00";
  public txt_end_date: string = "2019/03/03T00:30";
  public selectAdrees: string;
  private zhan: string ="16";
  private txt_zhan : string;

  // value nav
  private flagsShow: boolean = true;
  public showZhan: boolean = true;


  constructor(private commoService: CommonService, private translateService: TranslateService) {
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.selectAdrees = translateService.instant("nav.adrress");
      this.txt_zhan =translateService.instant("rainFall.station");
    });
  }

  ngOnInit() {
    this.txt_zhan =this.translateService.instant("rainFall.station");
    this.selectAdrees = this.translateService.instant("nav.adrress");
    this.reviceData();
    this.showFunctionHeader();
 
  }
  checkLogin() {
    localStorage.setItem("access_token","access_token");
    if (localStorage.getItem("access_token").length > 0) {
      this.commoService.notifyOther({ option: 'callOpenMenu', value: 'openMenu' });
    } else {
      alert("PLEASE LOGIN");
    }

  }
  showFunctionHeader() {
    //this.selectAdrees = this.translateService.instant("nav.adrress");
    if (this.title === "TODAY") {
      this.flagsShow = false;
    } else if(this.title == this.translateService.instant("home.windspeed")){
      this.showZhan = true;
      this.flagsShow = true;
    }else {
      this.flagsShow = true;
      this.showZhan = false;
    }
    
  }
  // nhan data
  reviceData() {
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callIconMenu') {
        this.icon_val = res.value;

      } else if (res.hasOwnProperty('option') && res.option === 'sendTitle') {
        this.title = res.value;
        this.showFunctionHeader();
      } else if (res.hasOwnProperty('option') && res.option === 'dateSpeed') {
        this.txt_start_date = res.value;
      } else if (res.hasOwnProperty('option') && res.option === 'addreess') {
        //this.selectAdrees = res.value;
      } else if (res.hasOwnProperty('option') && res.option === 'selectzham') {
        this.zhan = res.value;
        this.txt_zhan = this.translateService.instant("rainFall.station");
      }

    });
  }
}

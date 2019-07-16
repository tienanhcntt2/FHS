import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavComponent } from 'src/app/nav/nav.component';
import { listMenu } from 'src/app/config/listmenu';
import { CommonService } from 'src/app/service/CommonService';
import { RainFall, Service, ValueRain } from 'src/app/model/rainFall';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-ran-fall',
  templateUrl: './ran-fall.component.html',
  styleUrls: ['./ran-fall.component.scss']
})
export class RanFallComponent implements OnInit {

  /**
   * item child
   */
  @ViewChild('drawer') drawer;
  @ViewChild('end') dateEnd;
  @ViewChild('start') dateStart;
  @ViewChild(NavComponent)
  private nav: NavComponent;
  private dataSource: RainFall[];

  /**
   * get data ulr and number
   */
  private numberDate : number;
  private urlRainFall: string ="http://10.199.15.95/mops/Meteorology/rainfall?days=";



  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string = "00:00:00";
  private txt_time_end: string = "00:30:00";
  public date = new FormControl(new Date());

  // value right 
  private numbercheckShow: number = 0;
  private widthleft: number = 60;
  private widthright: number = 40;
  private icon_show: string = "../../assets/image/icon_hiden.png";
  okma: boolean = true;

  // value menu var
  private listmenu = listMenu;
  private clickOpen: number = 0;
  private subscription: Subscription;

  // value table detail
  private nameMaticon: string = "../../assets/image/drop_down.png";
  private numberCheck: number = 0;
  private show: boolean = true;
  email: string;
  enDate: any;
  /**
   * constructor ranfall
   * @param commoService 
   * @param service 
   * @param datePipe
   */
  constructor(private datePipe: DatePipe, private commoService: CommonService, service: Service,
    private http: HttpClient, private translate: TranslateService) {
    this.dataSource = service.getData();
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
      this.sendTitle();
    });
    let date = new Date();
    this.enDate = new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
  }

  ngOnInit() {
    this.sendTitle();
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });

    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 6), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
     this.numberDate = this.getNumberDate(this.txt_date_start,this.txt_date_end);
    this.urlRainFall = this.urlRainFall +this.numberDate;
    this.getDataRainFall(this.urlRainFall,this.getToken());
  }

  customizeTooltip(arg: any) {
    return {
        text: arg.valueText, color: "#00ffff"
    };
   }

  /**
    * show open menu in teamplerature
    */
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "../../assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "../../assets/image/drop_up.png"
    }

    this.drawer.toggle();
  }
  /**
   * function open date when click
   */
  openDate() {

    this.dateEnd.open();
  }
   /**
   * function open date when click
   */
  openStartDate() {
    this.dateStart.open();
  }
  /**
   * event click change date when select
   * @param type 
   * @param event 
   */
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.txt_date_start = this.datePipe.transform(event.value, "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * change date when click
   * @param type 
   * @param event 
   */
  endDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.txt_date_end = this.datePipe.transform(event.value, "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
   
  }

  /**
   * funciont send title for nav
   */
  sendTitle() {
    this.nav.title = this.translate.instant("home.rainfall");
  }
  /*
  * function show icon left and right
  */
  functionShowHide() {
    this.numbercheckShow += 1;
    if (this.numbercheckShow % 2 == 0) {
      this.okma = true;
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show = "../../assets/image/icon_hiden.png";

    } else {
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3;
      this.icon_show = "../../assets/image/icon_show.png";
    }

  }
  /**
   * function show detail table
   * icon change and item
   */
  private showDetail() {

    this.numberCheck += 1;
    if (this.numberCheck % 2 == 0) {
      this.show = true;
      this.nameMaticon = "../../assets/image/drop_down.png"
    } else {
      this.show = false;
      this.nameMaticon = "../../assets/image/drop_up.png"
    }
  }

  /**
  * 
  * @param dayStart 
  * @param dayEnd 
  * @param timerStart 
  * @param timerEnd 
  */
  private setValueDatetimer(dayStart: string, dayEnd: string, timerStart: string, timerEnd: string) {
    this.nav.txt_start_date = dayStart + "T" + timerStart;
    this.nav.txt_end_date = dayEnd + "T" + timerEnd;
  }

  /**
   * get number date in angular
   * @param date1 
   * @param date2 
   */
  private getNumberDate(date1: string, date2:string){
    let diffInMs: number = Date.parse(date2) - Date.parse(date1);
    let diffInDate: number = diffInMs / (1000 * 3600 * 24) +1;
    
    return diffInDate
  }
  /**
   * function seach rainFall
   */
  clickSeach(){
    this.numberDate = this.getNumberDate(this.txt_date_start,this.txt_date_end);
    this.urlRainFall = "http://10.199.15.95/mops/Meteorology/rainfall?days=";
    this.urlRainFall = this.urlRainFall +this.numberDate;
    this.getDataRainFall(this.urlRainFall,this.getToken());
  }

  /**
   * get data rainFall
   * @param numberDate 
   */
  private getDataRainFall( url: string,auth_token :string){
    return this.http.get<RainFall[]>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+auth_token)
  }).subscribe(
      result => {
         this.dataSource = result;
         
         
      },
      err => {
        console.log("Error- something is wrong!")
  });
  }
  /**
   * get access token when login
   */
  getToken() {
    return localStorage.getItem("access_token");
  }
}

import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NavComponent } from 'src/app/nav/nav.component';
import { listMenu } from 'src/app/config/listmenu';
import { CommonService } from 'src/app/service/CommonService';
import { RainFall, Service, ValueRain, ListRainFall } from 'src/app/model/rainFall';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';


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
  @ViewChild(NavComponent)
  private nav: NavComponent;
  public dataSource: RainFall[];

  /**
   * get data ulr and number
   */
  private numberDate : number;
  private urlRainFall: string ="http://10.199.15.95/mops/Meteorology/cumulativerainfall?";



  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string;
  private txt_time_end: string;
  public date = new FormControl(new Date());

  // value right 
  private numbercheckShow: number = 0;
  public widthleft: number = 60;
  public widthright: number = 40;
  public icon_show: string = "/assets/image/icon_hiden.png";
  okma: boolean = true;

  // value menu var
  private listmenu = listMenu;
  private clickOpen: number = 0;
  private subscription: Subscription;
  private selectToday : Date;

  // value table detail
  private nameMaticon: string = "/assets/image/drop_down.png";
  private numberCheck: number = 0;
  private show: boolean = true;
  private email: string;
  private enDate: any;
  private startDate:any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;
  /**
   * constructor ranfall
   * @param commoService 
   * @param service 
   * @param datePipe
   */
  constructor(private datePipe: DatePipe, private commoService: CommonService, service: Service,
    private http: HttpClient, private translate: TranslateService,private intl: IntlService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
      this.sendTitle();
    });
    if(window.innerWidth <770){
     this.widthleft = 100;
     this.widthright = 100;
    }
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
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
    this.txt_time_start = this.formatValue(this.timeStart) +":00";
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";

    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
     this.numberDate = this.getNumberDate(this.txt_date_start,this.txt_date_end);
    this.getDataRainFall(this.urlRainAPi(),this.getToken());
    console.log("anhtt : " +this.urlRainAPi());
  }
  

  customizeTooltip(arg: any) {
    return {
        text: arg.valueText, color: "#00ffff"
    };
   }

   private urlRainAPi() :string{
     return this.urlRainFall +"start="+this.txt_date_start+"T"+this.txt_time_start +"&end="+this.txt_date_end+"T"+this.txt_time_end;
   }

 @HostListener('window:resize', ['$event'])
onResize(event?) {
  if(window.innerWidth <=770){
    this.widthleft = 100;
    this.widthright = 100;
  }
}
  /**
    * show open menu in teamplerature
    */
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "/assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "/assets/image/drop_up.png"
    }

    this.drawer.toggle();
  }

 /**
  * start day
  * @param value 
  */
  onChangeStartDay(value: Date) {
    
    this.txt_date_start = this.datePipe.transform(value, "yyyy/MM/dd");
    if(this.txt_date_start === this.datePipe.transform(new Date(), "yyyy/MM/dd")){
      this.fplagStart = false;
    }else{
      this.fplagStart = true;
    }
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * end date
   * @param value 
   */
  onChangeEndDay(value: Date) {
    this.txt_date_end = this.datePipe.transform(value, "yyyy/MM/dd");
    if(this.txt_date_end === this.datePipe.transform(new Date(), "yyyy/MM/dd")){
      this.fplagEnd = true;
    }else{
      this.fplagEnd = false;
    }
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
   
  }
  /**
   * on change timer start
   * @param value 
   */
  onChangeTimerStart(value: Date){
    this.txt_time_start = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * change timer end
   * @param value 
   */
  onChangeTimerEnd(value: Date){
    this.txt_time_end = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * forma value timer
   * @param value 
   */
  private formatValue(value?: Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
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
      // this.widthleft = 60;
      // this.widthright = 40;
      this.icon_show = "/assets/image/icon_hiden.png";

    } else {
      this.okma = false;
      // this.widthleft = 97;
      // this.widthright = 3;
      this.icon_show = "/assets/image/icon_show.png";
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
      this.nameMaticon = "/assets/image/drop_down.png"
    } else {
      this.show = false;
      this.nameMaticon = "/assets/image/drop_up.png"
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
    //this.numberDate = this.getNumberDate(this.txt_date_start,this.txt_date_end);
    
    this.getDataRainFall(this.urlRainAPi(),this.getToken());
  }

  /**
   * get data rainFall
   * @param numberDate 
   */
  private getDataRainFall( url: string,auth_token :string){
    return this.http.get<ListRainFall>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+auth_token)
  }).subscribe(
      result => {
        this.dataSource = result.rainfalls;
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

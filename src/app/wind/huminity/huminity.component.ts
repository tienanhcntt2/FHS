import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/CommonService';
import { Subscription } from 'rxjs';
import { listMenu } from 'src/app/config/listmenu';
import { NavComponent } from 'src/app/nav/nav.component';
import { ServiceHuminity, HuminityInfo, HuminityDescription } from 'src/app/model/huminity';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Weather, WeatherService } from 'src/app/model/Weather';



@Component({
  selector: 'app-huminity',
  templateUrl: './huminity.component.html',
  styleUrls: ['./huminity.component.scss']
})
export class HuminityComponent implements OnInit {
  @ViewChild('drawer') drawer;
  @ViewChild('end') dateEnd;
  @ViewChild('start') dateStart;
  @ViewChild(NavComponent)
  private nav: NavComponent;
  enDate : any;
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

  /**
 * select date and timer
 */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string = "00:00:00";
  private txt_time_end: string = "00:30:00";
  public date = new FormControl(new Date());

  private txt_seach_date :any;
  private weatherData: Weather[];
  private day = new Date();
  public dayEnd = new FormControl(this.day);
  /**
   * 
   * @param commoService 
   * @param service 
   * @param httpClient 
   * @param datePipe 
   */
  constructor(private commoService: CommonService, private httpClient: HttpClient, private datePipe: DatePipe,
    private translate: TranslateService, private weatherService: WeatherService) {
  
    let date = new Date();
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.sendTitle();
    });
    
    this.enDate = new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
  }
  /**
   * ng onit
   */
  ngOnInit() {
    this.sendTitle();

    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });
    let date = new Date();
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 6), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);

    this.getData();
     
  }
  /**
   * get data
   */
  private getData(){
    this.txt_seach_date = this.txt_date_start;
    this.weatherData = this.weatherService.getDataWeather(
      this.getNumberDate(this.txt_date_start,this.txt_date_end)
      ,this.txt_seach_date,this.datePipe);
  }
  /**
   * 
   * @param arg 
   */
  precipitationCustomizeText(arg: any) {
    return arg.value + " %";
  }
  /**
   * customizeTooltip
   * @param arg 
   */

  customizeTooltip(arg: any) {
    return {
      alert : "hello"
      //text: arg.seriesName + ": " + arg.value + " ( range: " + arg.lowErrorValue + " - " + arg.highErrorValue + ")"
      
    };
  }
  /**
  * event open date date end 
  */
  openDate() {

    this.dateEnd.open();
  }
  /**
   * event open date start
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
  showhiden = false;
  selectedRegion = "";
  pointClick(e: any) {
    this.showhiden = true;
    var point = e.target;
    point.showTooltip();
    this.selectedRegion = point.argument;
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
   * funciont send title for nav
   */
  sendTitle() {
    this.nav.title = this.translate.instant("home.Humidity");
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
   * custom point
   */
  highAverage = 60;
  lowAverage = 40;
  customizePoint = (arg: any) => {
    
    if(arg.value>=61 && arg.value<=80){
      return { color: "#FFCC00", hoverStyle: { color: "#FFCC00" } };
    } else if(arg.value>=81 && arg.value<=100){
      return { color: "#FF0000", hoverStyle: { color: "#FF0000" } };
    } else if(arg.value>=20 && arg.value<=60){
      return { color: "#66FF00", hoverStyle: { color: "#66FF00" } };
    } else if(arg.value<=19){
      return { color: "#FF0000", hoverStyle: { color: "#FF0000" } };
    }
  }
    /**
   * custom text
   */
  customizeText = (arg: any) => {
    return arg.valueText + " %";
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
   * function seacher
   */
  functionSeachData(){
    if(this.getNumberDate(this.txt_date_start,this.txt_date_end)<1){
      alert("Please selec date");
    }else{
      this.getData();
    }
  }
}

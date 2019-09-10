import { Component, OnInit, ViewChild,  HostListener } from '@angular/core';

import { listMenu } from 'src/app/config/listmenu';
import { CommonService } from 'src/app/service/CommonService';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import {  WeatherService, Teamperate } from 'src/app/model/Weather';

import { DatePipe } from '@angular/common';

import {  DxChartComponent } from 'devextreme-angular';
import { IntlService } from '@progress/kendo-angular-intl';

import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {


  @ViewChild(DxChartComponent) chart: DxChartComponent;

  private enDate: any;
  private startDate:any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;
  private selectToday : Date;
  // value right 
  private numbercheckShow: number = 0;
  public widthleft: number = 60;
  public widthright: number = 40;
  public icon_show: string = "assets/image/icon_hiden.png";
  okma: boolean = true;

  // value menu var
  private listmenu = listMenu;
  private clickOpen: number = 0;
  private subscription: Subscription;

  // value table detail
  private nameMaticon: string = "assets/image/drop_down.png";
  private numberCheck: number = 0;
  private show: boolean = true;
  public teamperateData: Teamperate[];
  private valueText: string;

  /**
* select date and timer
*/
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string ;
  private txt_time_end: string ;
  private txt_seach_date: any;
  public nameColumnRight: string ="col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string ="col-sm-12 col-md-7 ";

    // version 2
    private dateTimerStrart: string;
    private dateTimerEnd: string;
  /**
   * constructor
   * @param commoService 
   * @param httpClient 
   * @param translate 
   * @param weatherService 
   * @param datePipe 
   */
  constructor(private commoService: CommonService, private httpClient: HttpClient,
    private translate: TranslateService, private weatherService: WeatherService, private datePipe: DatePipe,
    private intl: IntlService,private titleService: Title) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.sendData();

    });
    if(window.innerWidth <=768){
      this.showIconMobile();
     }else{
       this.showIconDesktop();
     }
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.sendData();
    
    this.txt_time_start = this.formatValue(this.timeStart) +":00";
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 6), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
    this.getData();
    
  }



  
  /**
   * event click change date when select
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
   * formar timer
   */
  private formatValue(value?: Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }

  private sendData() {
    this.commoService.notifyOther({ option: "numberMenu", value: 4 });
    this.commoService.notifyOther({ option: "flagsShow", value: true });
    this.commoService.notifyOther({ option: "home", value: this.translate.instant("menu.Temperature") })
    this.commoService.notifyOther({ option: "location", value: "BUILD-D" });
    this.titleService.setTitle(this.translate.instant("menu.Temperature") + "-" + this.translate.instant("home.weather"));
  }
  /**
   * 
   * @param key 
   * @param value 
   */
  private sendDateTimer(key: string, value: string) {
    this.commoService.notifyOther({ option: key, value: value });
  }
  /*
  * function show icon left and right
  */
 functionShowHide() {
  this.numbercheckShow += 1;
  if (this.numbercheckShow % 2 == 0) {
    this.okma = true;
    this.nameColumnLeft = "col-sm-12 col-md-7";
    this.nameColumnRight ="col-sm-12 col-md-5 colum_right";
    
  } else {
    this.okma = false;
    this.nameColumnLeft = "col-sm-12 col-md-11 mx-auto";
    this.nameColumnRight = "col-sm-12 col-md-1 colum_right";
    
  }
  if(window.innerWidth <=768){
    this.showIconMobile();
   }else{
     this.showIconDesktop();
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
      this.nameMaticon = "assets/image/drop_down.png"
    } else {
      this.show = false;
      this.nameMaticon = "assets/image/drop_up.png"
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
    this.dateTimerStrart = dayStart + "T" + timerStart;
    this.dateTimerEnd = dayEnd + "T" + timerEnd;
   
    this.sendDateTimer("start",this.dateTimerStrart);
    this.sendDateTimer("end",this.dateTimerEnd);
  }

  /**
    * get number date in angular
    * @param date1 
    * @param date2 
    */
  private getNumberDate(date1: string, date2: string) {
    let diffInMs: number = Date.parse(date2) - Date.parse(date1);
    let diffInDate: number = diffInMs / (1000 * 3600 * 24) + 1;

    return diffInDate
  }
  /**
   * function seacher
   */
  functionSeachData() {
    if (this.getNumberDate(this.txt_date_start, this.txt_date_end) < 1) {
      alert("Please select date");
    } else {
      this.getData();
    }

  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
    private printfChart(){
      this.chart.instance.print();
    }
  /**
  * get data
  */
  private getData() {

    this.teamperateData = this.weatherService.listTeamperate();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.innerWidth <=768){
     this.showIconMobile();
    }else{
      this.showIconDesktop();
    }
  }
  private  showIconMobile(){
    if(this.numbercheckShow %2 == 0){
      this.icon_show ="assets/image/icon_in.png";
    }else{
     this.icon_show ="assets/image/icon_below.png";
    }
  }
  private  showIconDesktop(){
    if(this.numbercheckShow %2 == 0){
      this.icon_show ="assets/image/icon_hiden.png";
    }else{
     this.icon_show ="assets/image/icon_show.png";
    }
    
  }
}

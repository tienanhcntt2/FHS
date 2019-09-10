import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonService } from 'src/app/service/CommonService';
import { Subscription } from 'rxjs';
import { listMenu } from 'src/app/config/listmenu';
import { NavComponent } from 'src/app/nav/nav.component';

import { DatePipe } from '@angular/common';

import { FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Weather, WeatherService, Huminity } from 'src/app/model/Weather';
import { IntlService } from '@progress/kendo-angular-intl';
import { SlideMenuComponent } from 'src/app/util/slide-menu/slide-menu.component';
import { DxChartComponent } from 'devextreme-angular';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-huminity',
  templateUrl: './huminity.component.html',
  styleUrls: ['./huminity.component.scss']
})
export class HuminityComponent implements OnInit {

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

  // value table detail
  private nameMaticon: string = "assets/image/drop_down.png";
  private numberCheck: number = 0;
  private show: boolean = true;

  /**
 * select date and timer
 */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string;
  private txt_time_end: string ;
  public date = new FormControl(new Date());

  private txt_seach_date :any;
  public huminityData: Huminity[];
  private day = new Date();
  public dayEnd = new FormControl(this.day);
  public nameColumnRight: string ="col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string ="col-sm-12 col-md-7 ";
  // version 2
  private dateTimerStrart: string;
  private dateTimerEnd: string;
  /**
   * 
   * @param commoService 
   * @param service 
   * @param httpClient 
   * @param datePipe 
   */
  constructor(private commoService: CommonService, private datePipe: DatePipe,
    private translate: TranslateService, private weatherService: WeatherService,private intl: IntlService,private titleService: Title) {
  
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
   * ng onit
   */
  ngOnInit() {
    this.sendData();
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 6), "yyyy/MM/dd");
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    this.txt_time_end = this.formatValue(this.timeEnd) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);

    this.getData();
     
  }
  /**
   * get data
   */
  private getData(){
    this.huminityData = this.weatherService.GetListHuminity();
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
     
      text: arg.seriesName + ": " + arg.value + " ( range: " + arg.lowErrorValue + " - " + arg.highErrorValue + ")"
      
    };
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
 /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
    private printfChart(){
      this.chart.instance.print();
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
  private sendData() {
    this.commoService.notifyOther({ option: "numberMenu", value: 5 });
    this.commoService.notifyOther({ option: "flagsShow", value: true });
    this.commoService.notifyOther({ option: "home", value: this.translate.instant("home.Humidity") })
    this.commoService.notifyOther({ option: "location", value: "BUILD-D" });
    this.titleService.setTitle(this.translate.instant("home.Humidity") + "-" + this.translate.instant("home.weather"));
  }
  /**
   * 
   * @param key 
   * @param value 
   */
  private sendDateTimer(key: string, value: string) {
    this.commoService.notifyOther({ option: key, value: value });
  }
}

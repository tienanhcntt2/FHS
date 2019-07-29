import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavComponent } from 'src/app/nav/nav.component';
import { listMenu } from 'src/app/config/listmenu';
import { CommonService } from 'src/app/service/CommonService';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Weather, WeatherService } from 'src/app/model/Weather';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { DatePipe } from '@angular/common';

import {  DxChartComponent } from 'devextreme-angular';
import { IntlService } from '@progress/kendo-angular-intl';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  // child 
  @ViewChild('drawer') drawer;

  @ViewChild(NavComponent)
  private nav: NavComponent;

  @ViewChild("chartVar") chart: DxChartComponent;

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
  public weatherData: Weather[];
  private valueText: string;

  /**
* select date and timer
*/
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string ;
  private txt_time_end: string ;
  private txt_seach_date: any;
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
    private intl: IntlService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.sendTitle();

    });
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.sendTitle();
    
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });
    this.txt_time_start = this.formatValue(this.timeStart) +":00";
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 6), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
    this.getData();
    
  }

  customizeTooltip(arg: any) {
    var items = arg.valueText.split("\n"),
        color = arg.point.getColor();
    items.forEach(function(item, index) {
        if(item.indexOf(arg.seriesName) === 0) {
            var element = document.createElement("span");

            element.textContent = item;
            element.style.color = color;
            element.className = "active";

            items[index] = element.outerHTML;
        }
    });
    return { text: items.join("\n") };
}

  temperatureCustomizeText() {
    return this.valueText + " °C";
  }

  precipitationCustomizeText() {
    return this.valueText + " mm";
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
  /**
   * show open menu in teamplerature
   */
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "assets/image/drop_up.png"
    }
  
    this.drawer.toggle();
  }
  /**
   * funciont send title for nav
   */
  sendTitle() {
    this.nav.title = this.translate.instant("menu.Temperature");
  }
  /*
  * function show icon left and right
  */
  functionShowHide() {
    this.numbercheckShow += 1;
    //this.chart.instance.dispose();
    if (this.numbercheckShow % 2 == 0) {
      this.okma = true;
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show = "assets/image/icon_hiden.png";
      this.chart.instance.render();
    } else {
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3; 
      this.icon_show = "assets/image/icon_show.png";
      
      
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
    this.nav.txt_start_date = dayStart + "T" + timerStart;
    this.nav.txt_end_date = dayEnd + "T" + timerEnd;
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
  /**
  * get data
  */
  private getData() {
    this.txt_seach_date = this.txt_date_start;
    this.weatherData = this.weatherService.getDataWeather(
      this.getNumberDate(this.txt_date_start, this.txt_date_end
        ), this.txt_seach_date, this.datePipe);
  }
}

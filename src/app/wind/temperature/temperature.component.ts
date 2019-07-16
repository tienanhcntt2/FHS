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
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  // child 
  @ViewChild('drawer') drawer;
  @ViewChild('end') dateEnd;
  @ViewChild('start') dateStart;
  @ViewChild(NavComponent)
  private nav: NavComponent;

  @ViewChild("chartVar") chart: DxChartComponent;

  enDate: any;

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
  private weatherData: Weather[];
  private valueText: string;

  /**
* select date and timer
*/
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: string = "00:00:00";
  private txt_time_end: string = "23:59:00";
  public date = new FormControl(new Date());
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
    private translate: TranslateService, private weatherService: WeatherService, private datePipe: DatePipe) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.sendTitle();

    });

    let date = new Date();
    this.enDate = new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
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
    let date = new Date();
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
      this.icon_show = "../../assets/image/icon_hiden.png";
      this.chart.instance.render();
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

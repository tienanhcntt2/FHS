import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';


import { MatRadioButton, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from 'src/app/service/CommonService';
import { NavComponent } from 'src/app/nav/nav.component';

import { WindRose, WindDescription, WindValue, ConfigDataSpeed } from 'src/app/model/WindDescription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { SlideMenuComponent } from 'src/app/util/slide-menu/slide-menu.component';
import {  DxPolarChartComponent } from 'devextreme-angular';
import { DialogLoaddingComponent } from 'src/app/dialog-loadding/dialog-loadding.component';
import { ExcelServiceService } from 'src/app/service/excelservice.service';
import { Title } from '@angular/platform-browser';
import { AutherService } from 'src/app/service/autherService';


@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss']
})
export class SpeedComponent implements OnInit {


  //  value item 
  private subscription: Subscription;
  private showTable: boolean = true;
  
  /**
   * item chirld 
   */
  @ViewChild('drawer') drawer;

  @ViewChild(NavComponent)
  private nav: NavComponent;
  @ViewChild(SlideMenuComponent)
  private slide:SlideMenuComponent;
  @ViewChild(DxPolarChartComponent) radarChart: DxPolarChartComponent;

  private enDate: any;
  private startDate: any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;

  private checkSeach: boolean = false;
  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: any;
  private txt_time_end: any;


  public date = new FormControl(new Date());
  public nameMaticon: string = "assets/image/drop_down.png";
  public selectzhan: string = "";

  /*
   * click menu when open 
   */
  public position: number = 0;
  public clickOpen: number = 0;
  public numberCheck: number = 0;
  public icon_val: string = "";
  /*
   * data windrose for serve
   */


  public windSources: WindDescription[];

  public windRose: WindValue[];
  private windRoseData: WindRose[] = null;
  // show hide
  public okma: boolean = true;
  private selectToday: Date;
  public showExport: Boolean = false;

  /**
   * list table 
   */
  private listNametable: string[] = ['ARG', '0-2 m/s', '2-5 m/s', '5-10 m/s', '10-15 m/s', '> 15 m/s'];
  private urlSpeed: string = "http://10.199.15.95/mops/Meteorology/";
  private txt_zhan: string;

  public nameColumnRight: string = "col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string = "col-sm-12 col-md-7 ";
  /**
   * 
   * @param datePipe 
   * @param commoService 
   * @param speedService 
   * @param infoService 
   * @param userService 
   */
  constructor(private datePipe: DatePipe, private commoService: CommonService, 
    private http: HttpClient, private translateService: TranslateService, private intl: IntlService, private dataConfig: ConfigDataSpeed,public dialog: MatDialog,
    private excelService:ExcelServiceService,private titleService: Title, private authService:AutherService) {

    translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.sendTitle();
    });
    if(window.innerWidth <=768){
      this.showIconMobile();
     }else{
       this.showIconDesktop();
     }
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate = new Date(this.datePipe.transform(date.setDate(date.getDate() - 1)));
  }
  /**
   * onint
   */
  ngOnInit() {
    // chien cha
    this.txt_zhan = "sixteenwindrose?";

    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    // this.timeEnd.setMinutes(this.timeEnd.getMinutes() +30);
    this.txt_time_end = this.formatValue(this.timeEnd) + ":00";

    this.windRose = this.dataConfig.getWindRoseData();
    this.windSources = this.dataConfig.getWindSources();


    // speding
    this.sendTitle();
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    //this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate()), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
    // get data for open menu
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {

        this.checkOpenMenu();
      }

    });
    if(this.windRose != null){
      this.showExport = true;
    }
  }
  // check open menu
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "assets/image/drop_up.png"
    }
    this.drawer.toggle();
  }

  // click shart
  onLegendClick(e: any) {
    var series = e.target;
    if (series.isVisible()) {
      series.hide();
    } else {
      series.show();
    }
  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
    private printfChart(){
      this.radarChart.instance.print();
    }
  /**
   * event click change date when select
   * @param value 
   */
  onChangeStartDay(value: Date) {

    this.txt_date_start = this.datePipe.transform(value, "yyyy/MM/dd");
    if (this.txt_date_start === this.datePipe.transform(new Date(), "yyyy/MM/dd")) {
      this.fplagStart = false;
    } else {
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
    if (this.txt_date_end === this.datePipe.transform(new Date(), "yyyy/MM/dd")) {
      this.fplagEnd = true;
    } else {
      this.fplagEnd = false;
    }
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);

  }

  /**
     * on change timer start
     * @param value 
     */
  onChangeTimerStart(value: Date) {
    this.txt_time_start = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * change timer end
   * @param value 
   */
  onChangeTimerEnd(value: Date) {
    this.txt_time_end = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }

  // click show icon table show and hide
  showDetail() {
    this.numberCheck += 1;
    if (this.numberCheck % 2 == 0) {
      this.showTable = true;
      this.nameMaticon = "assets/image/drop_down.png"
    } else {
      this.showTable = false;
      this.nameMaticon = "assets/image/drop_up.png"
    }
  }


  // send title
  sendTitle() {
    this.nav.title = this.translateService.instant("home.windspeed");
    this.slide.numberPosition =2;
    this.titleService.setTitle(this.nav.title +"-" +this.translateService.instant("home.weather"));
  }
  // send data
  private sendValue(title: string, value: string) {
    this.commoService.notifyOther({ option: title, value: value });
  }

  onSelectionChange(mrb: MatRadioButton) {
    this.sendValue("selectzham", mrb.value);
  }

  // function show and hide
  numbercheckShow: number = 0;
  widthleft: number = 60;
  widthright: number = 40;
  public icon_show: string = "assets/image/icon_hiden.png";

  functionShowHide() {
    this.numbercheckShow += 1;
    if (this.numbercheckShow % 2 == 0) {
      this.okma = true;
      this.nameColumnLeft = "col-sm-12 col-md-7";
      this.nameColumnRight = "col-sm-12 col-md-5 colum_right";

    } else {
      this.okma = false;
      this.nameColumnLeft = "col-sm-12 col-md-11 mx-auto";
      this.nameColumnRight = "col-sm-12 col-md-1 colum_right";

    }
    if (window.innerWidth <= 768) {
      this.showIconMobile();
    } else {
      this.showIconDesktop();
    }
  }
  clickSeach() {
    if(!this.authService.isUserLoggedIn()){
      this.openDialog(2);
    }else{
      this.checkSeach = true;
      this.getdataSpeed(this.urlSpeed)
    }
  }


  getToken() {
    return localStorage.getItem("access_token");
  }
  /**
   * get date fengsu
   * @param url 
   * @param auth_token 
   */
  private getdataSpeed(url: string) {
    this.openDialog(1);
    url = url + this.txt_zhan + "start=" + this.nav.txt_start_date + "&end=" + this.nav.txt_end_date;
    return this.http.get<WindRose>(url).subscribe(
      result => {
        this.dialog.closeAll();
        this.windRose = result.values;
        //this.checkValue();
 
        this.showExport = true;
      },
      err => {
        this.dialog.closeAll();
        this.openDialog(3);
        this.showExport = false;
      });
  }


  max(a: WindValue[]) {
    let max = a[0].val1;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val1) {
        max = a[i].val1;
      }
    }
    return max;
  }
  max2(a: WindValue[]) {
    let max = a[0].val2;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val2) {
        max = a[i].val2;
      }
    }
    return max;
  }
  max3(a: WindValue[]) {
    let max = a[0].val3;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val3) {
        max = a[i].val3;
      }
    }
    return max;
  }
  max4(a: WindValue[]) {
    let max = a[0].val4;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val4) {
        max = a[i].val4;
      }
    }
    return max;
  }
  max5(a: WindValue[]) {
    let max = a[0].val5;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val5) {
        max = a[i].val5;
      }
    }
    return max;
  }
 
  min(a: WindValue[]) {
    let min = a[0].val1;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val1) {
        min = a[i].val1;
      }
    }
    return min;
  }
  min2(a: WindValue[]) {
    let min = a[0].val2;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val2) {
        min = a[i].val2;
      }
    }
    return min;
  }
  min3(a: WindValue[]) {
    let min = a[0].val3;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val3) {
        min = a[i].val3;
      }
    }
    return min;
  }
  min4(a: WindValue[]) {
    let min = a[0].val4;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val4) {
        min = a[i].val4;
      }
    }
    return min;
  }
  min5(a: WindValue[]) {
    let min = a[0].val5;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val5) {
        min = a[i].val5;
      }
    }
    return min;
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


  private formatValue(value?: Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
  private selectEight() {
    this.txt_zhan = "eightwindrose?";
    if (this.checkSeach == true) {
      this.getdataSpeed(this.urlSpeed);
    } else {

      this.windRose = this.dataConfig.getWindRoseDateEight();
      this.windSources = this.dataConfig.getWindSources();
    }

  }
  private selectSixteen() {
    this.txt_zhan = "sixteenwindrose?";
    if (this.checkSeach == true) {
      this.getdataSpeed(this.urlSpeed);
    } else {
      this.windRose = this.dataConfig.getWindRoseData();
      this.windSources = this.dataConfig.getWindSources();
    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth <= 768) {
      this.showIconMobile();
    } else {
      this.showIconDesktop();
    }
  }
  private showIconMobile() {
    if (this.numbercheckShow % 2 == 0) {
      this.icon_show = "assets/image/icon_in.png";
    } else {
      this.icon_show = "assets/image/icon_below.png";
    }
  }
  private showIconDesktop() {
    if (this.numbercheckShow % 2 == 0) {
      this.icon_show = "assets/image/icon_hiden.png";
    } else {
      this.icon_show = "assets/image/icon_show.png";
    }

  }
  animal: string;
  name: string;

  openDialog(position:number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
       width:"auto",
       height :"auto",
      data: {name: this.name, animal: this.animal,key:position},disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  exportExcel(){
    let fileName = this.translateService.instant("home.windspeed") +" - " +this.txt_date_start +"T"+this.txt_time_start +" - " +this.txt_date_end +"T"+this.txt_time_end
    this.excelService.exportAsExcelFile(this.windRose, fileName);
  }
}

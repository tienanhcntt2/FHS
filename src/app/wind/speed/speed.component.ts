import { Component, OnInit, ViewChild } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  FormControl } from '@angular/forms';


import {  MatRadioButton } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from 'src/app/service/CommonService';
import { InfoService } from 'src/app/service/info.Servicer';
import { NavComponent } from 'src/app/nav/nav.component';
import { UserServicer } from 'src/app/service/user.Servicer';
import { WindRose, WindDescription, WindValue, Service } from 'src/app/model/WindDescription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Router } from '@angular/router';
import { FhsAuthorizeService } from '@fhs/authorize';


@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss'],
  providers: [Service]
})
export class SpeedComponent implements OnInit {


  //  value item 
  private subscription: Subscription;
  private showTable: boolean = true;

  /**
   * item chirld 
   */
  @ViewChild('drawer') drawer;
  @ViewChild('chart') chart;


  @ViewChild(NavComponent)
  private nav: NavComponent;

  private enDate: any;
  private startDate:any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;
  private checkData : boolean = false;
  private checkSeach :boolean = false;
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

  private listWindValue: WindValue[] = [];
  public windRose: WindValue[];
  private windRoseData: WindRose[];
  // show hide
  public okma: boolean = true;
  private selectToday : Date;

  /**
   * list table 
   */
  private listNametable: string[] = ['ARG', 'Val 1', 'Val 2', 'Val 3', 'Val 4', 'Val 5', 'Val 6', 'Val 7', 'Val 8'];
  private urlSpeed: string = "http://10.199.15.95/mops/Meteorology/";
  private txt_zhan :string;


  /**
   * 
   * @param datePipe 
   * @param commoService 
   * @param speedService 
   * @param infoService 
   * @param userService 
   */
  constructor(private datePipe: DatePipe, private commoService: CommonService, private infoService: InfoService,
    private http: HttpClient, private translateService: TranslateService, private intl: IntlService, private router:Router,private service: Service,
    private auth:FhsAuthorizeService) {

    translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.sendTitle();
    });
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate() - 1)));
  }
  /**
   * onint
   */
  ngOnInit() {
    // chien cha
    this.txt_zhan ="sixteenwindrose?";
    
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    // this.timeEnd.setMinutes(this.timeEnd.getMinutes() +30);
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";
    
    this.windRose = this.service.getWindRoseData();
    this.windSources = this.service.getWindSources();


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
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show = "assets/image/icon_hiden.png";
    } else {
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3;
      this.icon_show = "assets/image/icon_show.png";
    }
  }
  clickSeach() {
    this.checkSeach = true;
    this.getdataSpeed(this.urlSpeed,this.getToken())
    
    
  }
  getDataWindValue() {
    this.listWindValue = this.windRose;
  }

  getToken() {
    return localStorage.getItem("access_token");
  }
  /**
   * get date fengsu
   * @param url 
   * @param auth_token 
   */
  private getdataSpeed(url: string, auth_token: string) {
    url = url +this.txt_zhan+"start="+this.nav.txt_start_date +"&end="+this.nav.txt_end_date;
    return this.http.get<WindRose>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + auth_token)
    }).subscribe(
      result => {
    
        this.windRose = result.values;
        this.getDataWindValue();
        this.checkValue();
        this.checkData = true;
      },
      err => {
        console.log("Error- something is wrong!")
        //this.router.navigateByUrl("**");
        this.checkData = false;
        
      });
  }

  private checkValue() {
    this.windSources = [
      { valueField: "val1", name: this.min(this.listWindValue) + "-" + this.max(this.listWindValue) + " m/s" },
      { valueField: "val2", name: this.min2(this.listWindValue) + "-" + this.max2(this.listWindValue) + " m/s" },
      { valueField: "val3", name: this.min3(this.listWindValue) + "-" + this.max3(this.listWindValue) + " m/s" },
      { valueField: "val4", name: this.min4(this.listWindValue) + "-" + this.max4(this.listWindValue) + " m/s" },
      { valueField: "val5", name: this.min5(this.listWindValue) + "-" + this.max5(this.listWindValue) + " m/s" },
      { valueField: "val6", name: this.min6(this.listWindValue) + "-" + this.max6(this.listWindValue) + " m/s" },
      { valueField: "val7", name: this.min7(this.listWindValue) + "-" + this.max7(this.listWindValue) + " m/s" },
      { valueField: "val8", name: this.min8(this.listWindValue) + "-" + this.max8(this.listWindValue) + " m/s" }
    ]


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
  max6(a: WindValue[]) {
    let max = a[0].val6;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val6) {
        max = a[i].val6;
      }
    }
    return max;
  }
  max7(a: WindValue[]) {
    let max = a[0].val7;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val7) {
        max = a[i].val7;
      }
    }
    return max;
  }
  max8(a: WindValue[]) {
    let max = a[0].val8;
    for (let i = 0; i < a.length; i++) {

      if (max < a[i].val8) {
        max = a[i].val8;
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
  min6(a: WindValue[]) {
    let min = a[0].val4;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val6) {
        min = a[i].val6;
      }
    }
    return min;
  }
  min7(a: WindValue[]) {
    let min = a[0].val7;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val7) {
        min = a[i].val7;
      }
    }
    return min;
  }
  min8(a: WindValue[]) {
    let min = a[0].val8;
    for (let i = 0; i < a.length; i++) {

      if (min > a[i].val8) {
        min = a[i].val8;
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
  private selectEight(){
    this.txt_zhan ="eightwindrose?";
    if(this.checkSeach == true){
      this.getdataSpeed(this.urlSpeed,this.getToken());
    }else{
     
      this.windRose = this.service.getWindRoseDateEight();
      this.windSources = this.service.getWindSources();
    }
   
  }
  private selectSixteen(){
    this.txt_zhan ="sixteenwindrose?";
    if(this.checkSeach == true){
      this.getdataSpeed(this.urlSpeed,this.getToken());
    }else{
      this.windRose = this.service.getWindRoseData();
      this.windSources = this.service.getWindSources();
    }
   
  }
}

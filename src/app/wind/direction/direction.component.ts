import { Component, OnInit,  ViewChild, HostListener } from '@angular/core';

import { DatePipe } from '@angular/common';

import { CommonService } from 'src/app/service/CommonService';
import { listMenu } from 'src/app/config/listmenu';

import { UserServicer } from 'src/app/service/user.Servicer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Fengxiang } from 'src/app/model/fengxiang';
import {  HttpClient } from '@angular/common/http';

import { DxChartComponent } from 'devextreme-angular';
import { MatDialog } from '@angular/material';
import { DialogLoaddingComponent } from 'src/app/dialog-loadding/dialog-loadding.component';
import { ExcelServiceService } from 'src/app/service/excelservice.service';
import { Title } from '@angular/platform-browser';
import { AutherService } from 'src/app/service/autherService';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

  @ViewChild(DxChartComponent) chart: DxChartComponent;

  private enDate: any;
  private startDate: any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;

  public show: boolean = true;
  public numberCheck: number = 0;
  public nameMaticon: string = "assets/image/drop_down.png";


  private clickOpen: number = 0;

  public okma: boolean = true;

  // menu
  listmenu = listMenu;

  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: any;
  private txt_time_end: any;

  private selectToday: Date;
  public stockPrices: Fengxiang[] = null;
  public myFengxiang: fengxiang [] =[];
  private urlData: string = "http://10.199.15.95/mops/Meteorology/winddirection?";
  public nameColumnRight: string = "col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string = "col-sm-12 col-md-7 ";
  public icon_show: string = "assets/image/icon_hiden.png";
  private numbercheckShow: number = 0;
  public showExport: Boolean = false;
  private animal: string;
  private  name: string;

  // version 2
  private dateTimerStrart: string;
  private dateTimerEnd: string;

  /**
   * constructor direction
   * @param commoService 
   * @param router 
   * @param datePipe 
   * @param formBuilder 
   * @param httpClient 
   * @param userService 
   */
  constructor(private commoService: CommonService, private datePipe: DatePipe,
    private userService: UserServicer, private translate: TranslateService, private intl: IntlService, private http: HttpClient,
    public dialog: MatDialog, private excelService: ExcelServiceService, private titleService: Title, private authService:AutherService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
     this.sendData();
    });
    if (window.innerWidth <= 768) {
      this.showIconMobile();
    } else {
      this.showIconDesktop();
    }
    this.selectToday = new Date();
    let date = new Date();
    this.enDate = new Date();
    this.startDate = new Date(this.datePipe.transform(date.setDate(date.getDate() - 1)));
  }
  /* ---------------------------------------------------
      onInit
      ----------------------------------------------------- */
  ngOnInit() {
    this.sendData();
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    this.txt_time_end = this.formatValue(this.timeEnd) + ":00";
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), "yyyy/MM/dd");
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
    if (this.stockPrices == null) {
      this.showExport = false;
    } else {
      this.showExport = true;
    }
  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
  private printfChart() {

    this.chart.instance.print();

  }
  /* ---------------------------------------------------
     ngOnDestroy
     ----------------------------------------------------- */
 
  /* ---------------------------------------------------
     Detail
     ----------------------------------------------------- */
  showDetail() {

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
  /**
   * formar timer
   */
  private formatValue(value?: Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }



  // function show and hide

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
    this.chart.instance.render();
  }
  /**
   * set value input for nav
   * @param dayStart 
   * @param dayEnd 
   * @param timerStart 
   * @param timerEnd 
   */
  private setValueDatetimer(dayStart: string, dayEnd: string, timerStart: string, timerEnd: string) {
    this.dateTimerStrart = dayStart + "T" + timerStart;
    this.dateTimerEnd = dayEnd + "T" + timerEnd;
    // this.nav.txt_start_date = dayStart + "T" + timerStart;
    // this.nav.txt_end_date = dayEnd + "T" + timerEnd;
    this.sendDateTimer("start",this.dateTimerStrart);
    this.sendDateTimer("end",this.dateTimerEnd);

  }
  customizeText = (arg: any) => {
    let value = new Date(arg.value);
    
    console.log("value : " +value);
    if (arg.valueText.length < 2) {
      arg.valueText = value.toLocaleString().split(' ')[1];

    }
    else if (arg.valueText.length > 8) {

      let temp = arg.valueText.split(' ');

      arg.valueText = temp[1] + temp[2];
    }
    return arg.valueText;
  }
  valueCustomizeText(arg: any) {

    switch (true) {
      case arg.value > 350: {
        arg.valueText = '360';
        break;
      }
      case arg.value > 300: {
        arg.valueText = '315';
        break;
      }
      case arg.value > 250: {
        arg.valueText = '270';
        break;
      }
      case arg.value > 200: {
        arg.valueText = '225';
        break;
      }
      case arg.value > 150: {
        arg.valueText = '180';
        break;
      }
      case arg.value > 100: {
        arg.valueText = '135';
        break;
      }
      case arg.value > 50: {
        arg.valueText = '90';
        break;
      }
      case arg.value > 0: {
        arg.valueText = '45';
        break;
      }
      case arg.value == 0: {
        arg.valueText = '0';
        break;
      }
    }
    //    
    return arg.valueText;
  }
  /**
   * get date fengsu
   * @param url 
   * @param auth_token 
   */
  private getDataWinddirection(url: string) {
    this.openDialog(1);
    url = url + "start=" + this.dateTimerStrart + "&end=" + this.dateTimerEnd;

    return this.http.get<Fengxiang[]>(url).subscribe(
      result => {
        this.dialog.closeAll();
        this.stockPrices = result;
        this.showExport = true;
      },
      err => {
        this.stockPrices = null;
        this.myFengxiang = null;
        this.dialog.closeAll();
        this.name =this.translate.instant("settingDialog.From") +" " +this.txt_date_start+"T"+this.txt_time_start +" " 
        +this.translate.instant("settingDialog.to") +" " +this.txt_date_end +"T"+this.txt_time_end
        this.openDialog(3);
      });
  }
  getToken() {
    return localStorage.getItem("access_token");
  }
  clickSeach() {

    if (!this.authService.isUserLoggedIn()) {
      
      this.openDialog(2);
    } else {
      this.getDataWinddirection(this.urlData);
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


  openDialog(position: number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
      width: "auto",
      height: "auto",
      data: { name: this.name, animal: this.animal, key: position }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  exportExcel() {
    let fileName = this.translate.instant("home.winddriction") + " - " + this.txt_date_start + "T" + this.txt_time_start + " - " + this.txt_date_end + "T" + this.txt_time_end
    this.openDialog(1);
    this.stockPrices.forEach(v =>{
            
           let my = new fengxiang(this.datePipe.transform(v.timestamp,"yyyy/MM/dd HH:mm:ss"),v.direction,this.nameDirection(v.direction));
           this.myFengxiang.push(my);
          
    });
    this.dialog.closeAll();
     this.excelService.exportAsExcelFile(this.myFengxiang, fileName);
  }

  customizeTooltip(arg: any) {
    
    return {
      text: arg.argument.toLocaleString('it-IT', {timeZone: 'Asia/Ho_Chi_Minh'})+ "  Value :" + arg.valueText
    };
  }
  public nameDirection(arg: number){
    let valueText: string ="";
    switch(true){
      case arg <11.25 || arg>=348.75:{
        valueText='N';
        break;
      }
      case arg<=33.75:{
        valueText='NNE';
        break;
      }
      case arg<=56.25:{
        valueText='NE';
        break;
      }
      case arg<=78.75:{
        valueText='ENE';
        break;
      }
      case arg<=101.25:{
        valueText='E';
        break;
      }
      case arg<=123.75:{
        valueText='ESE';
        break;
      }
      case arg<=146.25:{
        valueText='SE';
        break;
      }
      case arg<=168.75:{
        valueText='SSE';
        break;
      }
      case arg<=191.25:{
        valueText='S';
        break;
      }
      case arg<=213.75:{
        valueText='SSW';
        break;
      }
      case arg<=236.25:{
        valueText='SW';
        break;
      }
      case arg<=258.75:{
        valueText='WSW';
        break;
      }
      case arg<=281.25:{
        valueText='W';
        break;
      }
      case arg<=303.75:{
        valueText='WNW';
        break;
      }
      case arg<=326.25:{
        valueText='NW';
        break;
      }
      case arg<=348.75:{
        valueText='NNW';
        break;
      }
    }
    return valueText;
  }

  private sendData(){
    this.commoService.notifyOther({option:"numberMenu", value:3});
    this.commoService.notifyOther({option:"flagsShow", value: true});
    this.commoService.notifyOther({option:"home",value:this.translate.instant("home.winddriction")})
    this.commoService.notifyOther({option:"location", value:"BUILD-D"});
  }
  /**
   * 
   * @param key 
   * @param value 
   */
  private sendDateTimer(key:string, value:string){
    this.commoService.notifyOther({option:key, value:value});
  }
}
export class fengxiang{
  
  constructor(public Timestamp:string,public Direction: number, public nameDirection:string){

  }

}

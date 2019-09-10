import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { listMenu } from 'src/app/config/listmenu';
import { CommonService } from 'src/app/service/CommonService';
import { RainFall, ListRainFall } from 'src/app/model/rainFall';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';

import { DxChartComponent } from 'devextreme-angular';
import { MatDialog } from '@angular/material';
import { DialogLoaddingComponent } from 'src/app/dialog-loadding/dialog-loadding.component';
import { ExcelServiceService } from 'src/app/service/excelservice.service';
import { Title } from '@angular/platform-browser';
import { AutherService } from 'src/app/service/autherService';


@Component({
  selector: 'app-ran-fall',
  templateUrl: './ran-fall.component.html',
  styleUrls: ['./ran-fall.component.scss']
})
export class RanFallComponent implements OnInit {

  @ViewChild(DxChartComponent) chart: DxChartComponent;
  public dataSource: RainFall[] = null;

  /**
   * get data ulr and number
   */
  private numberDate: number;
  private urlRainFall: string = "http://10.199.15.95/mops/Meteorology/cumulativerainfall?";



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

  public icon_show: string = "assets/image/icon_hiden.png";
  okma: boolean = true;

  // value menu var
  private listmenu = listMenu;
  private clickOpen: number = 0;

  private selectToday: Date;

  // value table detail
  private nameMaticon: string = "assets/image/drop_down.png";
  private numberCheck: number = 0;
  private show: boolean = true;
  private email: string;
  private enDate: any;
  private startDate: any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;

  public nameColumnRight: string = "col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string = "col-sm-12 col-md-7 ";
  public showExport: Boolean = false;
  // version 2
  private dateTimerStrart: string;
  private dateTimerEnd: string;
  /**
   * constructor ranfall
   * @param commoService 
   * @param service 
   * @param datePipe
   */
  constructor(private datePipe: DatePipe, private commoService: CommonService,
    private http: HttpClient, private translate: TranslateService, private intl: IntlService,
    public dialog: MatDialog, private excelService: ExcelServiceService, private titleService: Title,
    private authService: AutherService) {
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

  ngOnInit() {
    this.sendData();
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), "yyyy/MM/dd");
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    this.txt_time_end = this.formatValue(this.timeEnd) + ":00";

    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
    this.numberDate = this.getNumberDate(this.txt_date_start, this.txt_date_end);
    // this.getDataRainFall(this.urlRainAPi(),this.getToken());
    if (this.dataSource != null) {
      this.showExport = true;
    }
  }


  customizeTooltip(arg: any) {
    return {
      text: arg.valueText, color: "#00ffff"
    };
  }

  private urlRainAPi(): string {
    return this.urlRainFall + "start=" + this.txt_date_start + "T" + this.txt_time_start + "&end=" + this.txt_date_end + "T" + this.txt_time_end;
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
  /**
   * start day
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
   * forma value timer
   * @param value 
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
   * function seach rainFall
   */
  clickSeach() {
    //this.numberDate = this.getNumberDate(this.txt_date_start,this.txt_date_end);
    if (!this.authService.isUserLoggedIn()) {
      this.openDialog(2);
    } else {
      this.getDataRainFall(this.urlRainAPi());
      this.chart.instance.render();
    }

  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
  private printfChart() {
    this.chart.instance.print();
  }

  /**
   * get data rainFall
   * @param numberDate 
   */
  private getDataRainFall(url: string) {
    this.openDialog(1);
    return this.http.get<ListRainFall>(url).subscribe(
      result => {
        this.dialog.closeAll();
        this.dataSource = result.rainfalls;
        this.showExport = true;
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
  animal: string;
  name: string;

  openDialog(position: number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
      width: "auto",
      height: "auto",
      data: { name: this.name, animal: this.animal, key: position }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  exportExcel() {
    let fileName = this.translate.instant("home.rainfall") + " - " + this.txt_date_start + "T" + this.txt_time_start + " - " + this.txt_date_end + "T" + this.txt_time_end
    this.excelService.exportAsExcelFile(this.dataSource, fileName);
  }
  private sendData() {
     let location = "BUILD-D";
    this.commoService.notifyOther({ option: "numberMenu", value: 1 });
    this.commoService.notifyOther({ option: "flagsShow", value: true });
    this.commoService.notifyOther({ option: "home", value: this.translate.instant("home.rainfall") })
    this.commoService.notifyOther({ option: "location", value: location });
    this.titleService.setTitle(this.translate.instant("home.rainfall") + "-" + this.translate.instant("home.weather"));
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

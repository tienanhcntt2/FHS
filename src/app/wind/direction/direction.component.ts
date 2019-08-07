import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/CommonService';
import { listMenu } from 'src/app/config/listmenu';
import { NavComponent } from 'src/app/nav/nav.component';
import { UserServicer } from 'src/app/service/user.Servicer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Fengxiang } from 'src/app/model/fengxiang';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FhsAuthorizeService } from '@fhs/authorize';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit, OnDestroy {

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

  private subscription: Subscription;
  public show: boolean = true;
  public numberCheck: number = 0;
  public nameMaticon: string = "assets/image/drop_down.png";


  private clickOpen: number = 0;

  public okma :boolean = true;

  // menu
  listmenu = listMenu;
  
  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: any;
  private txt_time_end: any;

  private selectToday : Date;
  public stockPrices: Fengxiang[];
  private urlData :string ="http://10.199.15.95/mops/Meteorology/winddirection?";
  /**
   * constructor direction
   * @param commoService 
   * @param router 
   * @param datePipe 
   * @param formBuilder 
   * @param httpClient 
   * @param userService 
   */
  constructor(private commoService: CommonService,  private datePipe: DatePipe,
    private userService: UserServicer,private translate:TranslateService, private intl: IntlService,private http: HttpClient,
    private auth : FhsAuthorizeService ) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
        this.sendTitle();
      });
      this.selectToday = new Date();
      let date = new Date();
      this.enDate = new Date();
      this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate()-1)));
  }
/* ---------------------------------------------------
    onInit
    ----------------------------------------------------- */
  ngOnInit() {
    this.nav.showZhan = false;
    this.sendTitle();
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    //this.txt_time_start = "00:00:00";
    //this.timeEnd.setMinutes(this.timeEnd.getMinutes() +30);
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";
    //this.txt_time_end = "15:00:00";
    // check login
    

    this.txt_date_start = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), "yyyy/MM/dd");
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start,this.txt_date_end,this.txt_time_start,this.txt_time_end);

    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });

  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
private printfChart(){
  this.chart.instance.print();

}
 /* ---------------------------------------------------
    ngOnDestroy
    ----------------------------------------------------- */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
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
 
  /* ---------------------------------------------------
    check menu
    ----------------------------------------------------- */
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "assets/image/drop_up.png"
    }
  
    this.drawer.toggle();
  }
/* ---------------------------------------------------
    Send title
    ----------------------------------------------------- */
  sendTitle() {
    this.nav.title =this.translate.instant("home.winddriction");
  }


  // function show and hide
  numbercheckShow : number = 0;
  widthleft: number = 60;
  widthright: number = 40;
  public icon_show: string ="assets/image/icon_hiden.png";
  functionShowHide(){
    this.numbercheckShow += 1;
    if(this.numbercheckShow %2 ==0 ){
      this.okma = true;
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show ="assets/image/icon_hiden.png";
    }else{
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3;
      this.icon_show ="assets/image/icon_show.png";
    }
  }
  /**
   * set value input for nav
   * @param dayStart 
   * @param dayEnd 
   * @param timerStart 
   * @param timerEnd 
   */
  private setValueDatetimer(dayStart:string,dayEnd:string,timerStart:string,timerEnd:string){
    this.nav.txt_start_date = dayStart +"T"+timerStart;
    this.nav.txt_end_date = dayEnd +"T" +timerEnd;

  }
  customizeText = (arg: any) => {
    let value = new Date(arg.value);
    if (arg.valueText.length < 2) {
        // console.log(arg.valueText);
        // console.log(value.toLocaleString());
        arg.valueText = value.toLocaleString().split(' ')[1];
        // console.log(arg.valueText);
    }
    else if (arg.valueText.length > 8) {
       
        let temp = arg.valueText.split(' ');
        
        arg.valueText = temp[1] + temp[2];
    }
    return arg.valueText;
}
valueCustomizeText(arg: any) {
    console.log(arg.value);
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
  private getDataWinddirection(url: string, auth_token: string) {
    url = url +"start="+this.nav.txt_start_date +"&end="+this.nav.txt_end_date;
  
    return this.http.get<Fengxiang[]>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + auth_token)
    }).subscribe(
      result => {
        this.stockPrices = result;

      },
      err => {
        console.log("Error- something is wrong!")
        //this.router.navigateByUrl("**");
        
      });
  }
  getToken() {
    return localStorage.getItem("access_token");
  }
  clickSeach(){
    this.getDataWinddirection(this.urlData,this.getToken());
  }

}

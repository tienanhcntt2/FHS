import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';

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
import { SlideMenuComponent } from 'src/app/util/slide-menu/slide-menu.component';
import { DxChartComponent } from 'devextreme-angular';
import { MatDialog } from '@angular/material';
import { DialogLoaddingComponent } from 'src/app/dialog-loadding/dialog-loadding.component';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer;


  @ViewChild(NavComponent)
  private nav: NavComponent;
  @ViewChild(SlideMenuComponent)
  private slide:SlideMenuComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;
  
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
  public nameColumnRight: string ="col-sm-12 col-md-5 colum_right";
  public nameColumnLeft: string ="col-sm-12 col-md-7 ";
  public icon_show: string = "assets/image/icon_hiden.png";
  private numbercheckShow: number = 0;
  
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
    public dialog: MatDialog) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
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
    this.slide.numberPosition =3;
  }


  // function show and hide

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
        arg.valueText = value.toLocaleString().split(' ')[1];

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
    this.openDialog(1);
    url = url +"start="+this.nav.txt_start_date +"&end="+this.nav.txt_end_date;
  
    return this.http.get<Fengxiang[]>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + auth_token)
    }).subscribe(
      result => {
        this.dialog.closeAll();
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
   
    if(this.getToken() ===""){
      this.openDialog(2);
    }else{
      this.getDataWinddirection(this.urlData,this.getToken());
    }
    
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
  animal: string;
  name: string;

  openDialog(position:number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
       width:"400px",
       height :"auto",
      data: {name: this.name, animal: this.animal,key:position},disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

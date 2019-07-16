import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { CommonService } from 'src/app/service/CommonService';

import { listMenu } from 'src/app/config/listmenu';
import { NavComponent } from 'src/app/nav/nav.component';
import { UserServicer } from 'src/app/service/user.Servicer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ScatterData, TeamperatureService, DataScatter } from 'src/app/service/Temperature';



@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit, OnDestroy {



  @ViewChild('drawer') drawer;
  @ViewChild('end') dateEnd;
  @ViewChild('start') dateStart;
  @ViewChild(NavComponent)
  private nav: NavComponent;

  
  dataSource: ScatterData[];
  dataDemo : DataScatter[];
  private subscription: Subscription;
  public show: boolean = true;
  public numberCheck: number = 0;
  public nameMaticon: string = "../../assets/image/drop_down.png";
  public dateCurrent: string;
  date = new FormControl(new Date());


  private  listNametable: string[];
  private listDirectionValue: string[];
// var item 
  showSelect: boolean = false;
  position: number = 0;
  clickOpen: number = 0;
  address: string;
  title: string;
  okma :boolean = true;

  // menu
  listmenu = listMenu;
  public icon_val: string;
  
  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start:string ="00:00:00";
  private txt_time_end: string ="00:30:00";



  /**
   * constructor direction
   * @param commoService 
   * @param router 
   * @param datePipe 
   * @param formBuilder 
   * @param httpClient 
   * @param userService 
   */
  constructor(private commoService: CommonService,  private datePipe: DatePipe
    , private httpClient: HttpClient, private userService: UserServicer,private translate:TranslateService,
    private teampleService :TeamperatureService ) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
        this.sendTitle();
      });
      this.dataSource =teampleService.getWeatherIndicators();

      for(let i=0 ;i<this.dataSource.length;i++){
        //this.dataDemo.push();
       
        this.dataDemo = this.dataSource[i].temp;
        // for(let j = 0;j<this.dataSource[i].temp.length;j++){
        //   console.log("anhtt"," hello = "+i +" " +this.dataSource[i].temp[j].time +" " +this.dataSource[i].temp[j].xiang);
        // }
       
      }
  }




  ngOnInit() {
    this.nav.showZhan = false;
    this.sendTitle();
  

    // check login
    this.userService.chienchalogin();

    this.txt_date_start = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start,this.txt_date_end,this.txt_time_start,this.txt_time_end);

    this.nav.selectAdrees = this.address;

    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });
   

  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  openDate() {

    this.dateEnd.open();
  }
  openStartDate() {
    this.dateStart.open();
  }
  // show detail table
  showDetail() {

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
   * change date
   * @param type 
   * @param event 
   */
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.txt_date_start = this.datePipe.transform(event.value, "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start,this.txt_date_end,this.txt_time_start,this.txt_time_end);
  }
  /**
   * change date
   * @param type 
   * @param event 
   */
  endDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.txt_date_end = this.datePipe.transform(event.value, "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start,this.txt_date_end,this.txt_time_start,this.txt_time_end);
  }
  // check login
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "../../assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "../../assets/image/drop_up.png"
    }
  
    this.drawer.toggle();
  }
  // change address
  changeAddres(event) {
 
    this.nav.selectAdrees = this.address;
  }
  sendTitle() {
    this.nav.title =this.translate.instant("home.winddriction");
  }

  // send data 
  // send data
  private sendValue(title: string, value: string) {
    this.commoService.notifyOther({ option: title, value: value });
  }

  // function show and hide
  numbercheckShow : number = 0;
  widthleft: number = 60;
  widthright: number = 40;
  public icon_show: string ="../../assets/image/icon_hiden.png";
  functionShowHide(){
    this.numbercheckShow += 1;
    if(this.numbercheckShow %2 ==0 ){
      this.okma = true;
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show ="../../assets/image/icon_hiden.png";
    }else{
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3;
      this.icon_show ="../../assets/image/icon_show.png";
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
}

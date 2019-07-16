import { OnInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.html'
  })
  export class SelectDate implements OnInit{

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    ngOnInit(){
       
    }

  }
import { Component, OnInit } from '@angular/core';
import { FhsAuthorizeService } from '@fhs/authorize';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {

  constructor(private auth: FhsAuthorizeService) {
  }
  ngOnInit() {
   
  }

  
}

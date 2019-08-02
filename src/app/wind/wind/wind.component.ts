import { Component, OnInit } from '@angular/core';
import { FhsAuthorizeService } from '@fhs/authorize';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {

  constructor(private auth: FhsAuthorizeService,private route: ActivatedRoute) {
  }
  ngOnInit() {

  }


}

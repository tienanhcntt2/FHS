import { NgModule }       from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';


import { SpeedComponent } from './speed/speed.component';
import { DirectionComponent } from './direction/direction.component';
import { WindRoutingModule } from './wind-routing.module';
import { WindComponent } from './wind/wind.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatDatepickerModule, MatNativeDateModule, 
  MatAutocompleteModule, MatCheckboxModule, MatRadioModule, 
  MatInputModule, MatIconModule, MatSliderModule,
   MatSidenavModule, MatMenuModule, MatListModule, 
   MatExpansionModule, MatFormFieldModule, 
   MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../service/CommonService';


import { DxPolarChartModule, DxSelectBoxModule, DxChartModule } from 'devextreme-angular';
import { HuminityComponent } from './huminity/huminity.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { RanFallComponent } from './ranfall/ran-fall.component';
import { Service } from '../model/rainFall';
import { ServiceHuminity } from '../model/huminity';
@NgModule({
  declarations: [
     SpeedComponent,
      DirectionComponent,
       WindComponent,
       HuminityComponent,
       TemperatureComponent,
       RanFallComponent
      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,  MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    HttpClientModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    WindRoutingModule,
    DxPolarChartModule,
    CommonModule,
    DxSelectBoxModule
  ],
  providers: [
    DatePipe, CommonService,Service
  ],
  bootstrap: [WindComponent]
})
  export class WindModule {}
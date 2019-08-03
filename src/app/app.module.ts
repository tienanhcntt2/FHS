import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatIconModule,
  MatRadioModule,
  MatSliderModule,
  MatMenuModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatFormFieldModule
} from '@angular/material';


import { FooterComponent } from './footer/footer.component';

import { CommonService } from './service/CommonService';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';


import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './util/page-not-found/page-not-found.component';
import { SpeedComponent } from './wind/speed/speed.component';
import { DirectionComponent } from './wind/direction/direction.component';
import { HomeComponent } from './wind/home/home.component';
import { WindComponent } from './wind/wind/wind.component';
import { DxPolarChartModule, DxSelectBoxModule, DxCircularGaugeModule, DxChartModule, DxTooltipModule } from 'devextreme-angular';
import { SlideMenuComponent } from './util/slide-menu/slide-menu.component';

import { LoginComponent } from './login/login.component';

import { UserServicer } from './service/user.Servicer';
import { TemperatureComponent } from './wind/temperature/temperature.component';
import { HuminityComponent } from './wind/huminity/huminity.component';
import { RanFallComponent } from './wind/ranfall/ran-fall.component';
import { Service } from './model/rainFall';
import { MyInterceptor } from './util/MyInterceptor';
import { ServiceHuminity } from './model/huminity';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TeamperatureService } from './service/Temperature';
import { WeatherService } from './model/Weather';

import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from './util/date.adapter';
import { TimePickerModule, DateInputsModule } from '@progress/kendo-angular-dateinputs';
import 'hammerjs';
import { ClockService } from './service/ClockService';
import { IntlModule } from '@progress/kendo-angular-intl';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.Languager);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    SpeedComponent,
    DirectionComponent,
    WindComponent,
    PageNotFoundComponent,
    SlideMenuComponent,
    LoginComponent,
    TemperatureComponent,
    HuminityComponent,
    RanFallComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule, MatIconModule,
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
    DxCircularGaugeModule,
    DxPolarChartModule,
    CommonModule,
    DxSelectBoxModule,
    DxChartModule,
    DxTooltipModule,
    TimePickerModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    IntlModule, DateInputsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    DatePipe, CommonService, UserServicer, Service, ServiceHuminity, TeamperatureService, WeatherService, ClockService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

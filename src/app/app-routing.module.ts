import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeedComponent } from './wind/speed/speed.component';
import { DirectionComponent } from './wind/direction/direction.component';
import { WindComponent } from './wind/wind/wind.component';
import { HomeComponent } from './wind/home/home.component';
import { PageNotFoundComponent } from './util/page-not-found/page-not-found.component';

import { TemperatureComponent } from './wind/temperature/temperature.component';
import { RanFallComponent } from './wind/ranfall/ran-fall.component';
import { HuminityComponent } from './wind/huminity/huminity.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'speed',
    component: SpeedComponent

  },
  {
    path: 'direction',
    component: DirectionComponent
  },
      {
        path: 'temperature',
        component: TemperatureComponent
    },
    {
        path : 'humidity',
        component : HuminityComponent

    },
    {
        path: 'rainfall',
        component: RanFallComponent
    },
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  ,
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

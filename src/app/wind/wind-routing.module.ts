import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeedComponent } from './speed/speed.component';
import { DirectionComponent } from './direction/direction.component';
import { WindComponent } from './wind/wind.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { RanFallComponent } from './ranfall/ran-fall.component';
import { HuminityComponent } from './huminity/huminity.component';
const routes: Routes = [
  {
      path: 'wind',
      component: WindComponent,
      children: [
          {
              path: 'speed',
              component: SpeedComponent
          },
          {
              path: 'direction',
              component: DirectionComponent
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
            path: 'temperature',
            component: TemperatureComponent
        }
      ]
  }
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class WindRoutingModule {}
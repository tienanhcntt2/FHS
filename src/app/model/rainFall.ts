import { Injectable } from '@angular/core';

export class RainFall {
    date: string;

    value: number;
    value2: number;
    value3: number;
    
}

export class ListRainFall{
    rainfalls: RainFall[];
}
export class ValueRain{
    value :number;
}

let data: RainFall[] = [{
    date: "2019/05/15",
    value: 120,
    value2: 220,
    value3: 300
   
}
, {
    date: "2019/05/16",
    value: 150,
    value2: 320,
    value3: 430
    
}, {
    date: "2019/05/17",
    value: 170,
    value2: 240,
    value3: 360
}, {
    date: "2019/05/18",
    value: 520,
    value2: 320,
    value3: 200
}, {
    date: "2019/05/19",
    value: 420,
    value2: 320,
    value3: 100
}, {
    date: "2019/05/20",
    value: 120,
    value2: 220,
    value3: 300
}, {
    date: "2019/05/21",
    value: 330,
    value2: 220,
    value3: 300
}];

@Injectable()
export class Service {
    getData(): RainFall[] {
        return data;
    }
    
}
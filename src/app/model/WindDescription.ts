import { Injectable } from '@angular/core';


export interface WindValue {
    arg: string;
    val1: number;
    val2: number;
    val3: number;
    val4: number;
    val5: number;
}

export interface WindRose {

    values: WindValue[];
}

export class WindDescription {
    valueField: string;
    name: string;
    color:string;
}
let windSources: WindDescription[] = [
    { valueField: "val1", name: "0-2 m/s",color:"#00ffff" },
    { valueField: "val2", name: "2-5 m/s" ,color:"#0090ff"},
    { valueField: "val3", name: "5-10 m/s", color:"#1400d4" },
    { valueField: "val4", name: "10-15 m/s",color:"#100183" },
    { valueField: "val5", name: "> 15 m/s" ,color:"#883af3"} 
]
let WindRoseDate : WindValue []=[{
    arg: "N",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NNE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "ENE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "E",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "ESE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SSE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "S",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SSW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "WSW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "W",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "WNW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NNW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}]
let WindRoseDateEight : WindValue []=[{
    arg: "N",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "E",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "S",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "SW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "W",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}, {
    arg: "NW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0
}]
@Injectable()
export class ConfigDataSpeed {
    getWindRoseData() {
        
        return WindRoseDate;
    }
    getWindRoseDateEight(){
        return WindRoseDateEight;
    }
    getWindSources() {
        return windSources;
    }
}
   
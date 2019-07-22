import { Injectable } from '@angular/core';

export interface WindValue {
    arg: string;
    val1: number;
    val2: number;
    val3: number;
    val4: number;
    val5: number;
    val6: number;
    val7: number;
    val8: number;
}

export interface WindRose {

    values: WindValue[];
}

export class WindDescription {
    valueField: string;
    name: string;
}
let windSources: WindDescription[] = [
    { valueField: "val1", name: "0-0 m/s" },
    { valueField: "val2", name: "0-0 m/s" },
    { valueField: "val3", name: "0-0 m/s" },
    { valueField: "val4", name: "0-0 m/s" },
    { valueField: "val5", name: "0-0 m/s" },
    { valueField: "val6", name: "0-0 m/s" },
    { valueField: "val7", name: "0-0 m/s" },
    { valueField: "val8", name: "0-0 m/s" }
]
let WindRoseDate : WindValue []=[{
    arg: "N",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NNE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "ENE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "E",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "ESE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SSE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "S",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SSW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "WSW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "W",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "WNW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NNW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}]
let WindRoseDateEight : WindValue []=[{
    arg: "N",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "E",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SE",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "S",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "SW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "W",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}, {
    arg: "NW",
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0
}]
@Injectable()
export class Service {
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
   
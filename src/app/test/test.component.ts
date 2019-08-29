import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  title = 'PointChartAngular';
  
  constructor(){

  }
  ngOnInit(): void {
    
  }
  customizeTooltip(arg:any){
      return {
          text: arg.argument.toTimeString() +" " +arg.valueText
      };
  }
  stockPrices : Fengxiang[] =[
    {
        timestamp : new Date('2019-07-08T10:02:00Z') ,
        direction: 100
    },
    {
        timestamp:new Date('2019-07-08T10:03:00Z') ,
        direction: 234
    },
    {
        timestamp:new Date('2019-07-08T10:04:00Z') ,
        direction: 249.7
    },
    {
        timestamp:new Date('2019-07-08T10:05:00Z') ,
        direction: 225.3
    },
    {
        timestamp:new Date('2019-07-08T10:06:00Z') ,
        direction: 224.3
    },
    {
        timestamp:new Date('2019-07-08T10:07:00Z') ,
        direction: 194.8
    },
    {
        timestamp:new Date('2019-07-08T10:08:00Z') ,
        direction: 211.4
    },
    {
        timestamp:new Date('2019-07-08T10:09:00Z') ,
        direction: 248
    },
    {
        timestamp:new Date('2019-07-08T10:10:00Z') ,
        direction: 224.5
    },
    {
        timestamp:new Date('2019-07-08T10:11:00Z') ,
        direction: 218.1
    },
    {
        timestamp:new Date('2019-07-08T10:12:00Z') ,
        direction: 237.8
    },
    {
        timestamp:new Date('2019-07-08T10:13:00Z') ,
        direction: 240.2
    },
    {
        timestamp:new Date('2019-07-08T10:14:00Z') ,
        direction: 230.8
    },
    {
        timestamp:new Date('2019-07-08T10:15:00Z') ,
        direction: 225.7
    },
    {
        timestamp:new Date('2019-07-08T10:16:00Z') ,
        direction: 224.2
    },
    {
        timestamp:new Date('2019-07-08T10:17:00Z') ,
        direction: 209.3
    },
    {
        timestamp:new Date('2019-07-08T10:18:00Z') ,
        direction: 207.9
    },
    {
        timestamp:new Date('2019-07-08T10:19:00Z') ,
        direction: 223.3
    },
    {
        timestamp:new Date('2019-07-08T10:20:00Z') ,
        direction: 219.1
    },
    {
        timestamp:new Date('2019-07-08T10:21:00Z') ,
        direction: 207.1
    },
    {
        timestamp:new Date('2019-07-08T10:22:00Z') ,
        direction: 238.3
    },
    {
        timestamp:new Date('2019-07-08T10:23:00Z') ,
        direction: 244.1
    },
    {
        timestamp:new Date('2019-07-08T10:24:00Z') ,
        direction: 241.8
    },
    {
        timestamp:new Date('2019-07-08T10:25:00Z') ,
        direction: 256
    },
    {
        timestamp:new Date('2019-07-08T10:26:00Z') ,
        direction: 240.8
    },
    {
        timestamp:new Date('2019-07-08T10:27:00Z') ,
        direction: 216.8
    },
    {
        timestamp:new Date('2019-07-08T10:28:00Z') ,
        direction: 243.9
    },
    {
        timestamp:new Date('2019-07-08T10:29:00Z') ,
        direction: 231.7
    },
    {
        timestamp:new Date('2019-07-08T10:30:00Z') ,
        direction: 246.8
    },
    {
        timestamp:new Date('2019-07-08T10:31:00Z') ,
        direction: 239.2
    },
    {
        timestamp:new Date('2019-07-08T10:32:00Z') ,
        direction: 246.8
    },
    {
        timestamp:new Date('2019-07-08T10:33:00Z') ,
        direction: 232.9
    },
    {
        timestamp:new Date('2019-07-08T10:34:00Z') ,
        direction: 212.2
    },
    {
        timestamp:new Date('2019-07-08T10:35:00Z') ,
        direction: 200.8
    },
    {
        timestamp:new Date('2019-07-08T10:36:00Z') ,
        direction: 214.4
    },
    {
        timestamp:new Date('2019-07-08T10:37:00Z') ,
        direction: 222.4
    },
    {
        timestamp:new Date('2019-07-08T10:38:00Z') ,
        direction: 244.8
    },
    {
        timestamp:new Date('2019-07-08T10:39:00Z') ,
        direction: 246.2
    },
    {
        timestamp:new Date('2019-07-08T10:40:00Z') ,
        direction: 230.9
    },
    {
        timestamp:new Date('2019-07-08T10:41:00Z') ,
        direction: 213.4
    },
    {
        timestamp:new Date('2019-07-08T10:42:00Z') ,
        direction: 206.5
    },
    {
        timestamp:new Date('2019-07-08T10:43:00Z') ,
        direction: 226.7
    },
    {
        timestamp:new Date('2019-07-08T10:44:00Z') ,
        direction: 241.2
    },
    {
        timestamp:new Date('2019-07-08T10:45:00Z') ,
        direction: 236
    },
    {
        timestamp:new Date('2019-07-08T10:46:00Z') ,
        direction: 219.1
    },
    {
        timestamp:new Date('2019-07-08T10:47:00Z') ,
        direction: 216.5
    },
    {
        timestamp:new Date('2019-07-08T10:48:00Z') ,
        direction: 249.6
    },
    {
        timestamp:new Date('2019-07-08T10:49:00Z') ,
        direction: 220
    },
    {
        timestamp:new Date('2019-07-08T10:50:00Z') ,
        direction: 214.2
    },
    {
        timestamp:new Date('2019-07-08T10:51:00Z') ,
        direction: 217.8
    },
    {
        timestamp:new Date('2019-07-08T10:52:00Z') ,
        direction: 202.6
    },
    {
        timestamp:new Date('2019-07-08T10:53:00Z') ,
        direction: 227.9
    },
    {
        timestamp:new Date('2019-07-08T10:54:00Z') ,
        direction: 263.8
    },
    {
        timestamp:new Date('2019-07-08T10:55:00Z') ,
        direction: 212.8
    },
    {
        timestamp:new Date('2019-07-08T10:56:00Z') ,
        direction: 212.1
    },
    {
        timestamp:new Date('2019-07-08T10:57:00Z') ,
        direction: 233.6
    },
    {
        timestamp:new Date('2019-07-08T10:58:00Z') ,
        direction: 241.6
    },
    {
        timestamp:new Date('2019-07-08T10:59:00Z') ,
        direction: 243.2
    },
    {
        timestamp:new Date('2019-07-08T11:00:00Z') ,
        direction: 241.3
    },
    {
        timestamp:new Date('2019-07-08T11:01:00Z') ,
        direction: 246.6
    },
    {
        timestamp:new Date('2019-07-08T11:02:00Z') ,
        direction: 241.8
    },
    {
        timestamp:new Date('2019-07-08T11:03:00Z') ,
        direction: 238
    },
    {
        timestamp:new Date('2019-07-08T11:04:00Z') ,
        direction: 246.2
    },
    {
        timestamp:new Date('2019-07-08T11:05:00Z') ,
        direction: 243.3
    },
    {
        timestamp:new Date('2019-07-08T11:06:00Z') ,
        direction: 242.7
    },
    {
        timestamp:new Date('2019-07-08T11:07:00Z') ,
        direction: 245.2
    },
    {
        timestamp:new Date('2019-07-08T11:08:00Z') ,
        direction: 239.8
    },
    {
        timestamp:new Date('2019-07-08T11:09:00Z') ,
        direction: 235.1
    },
    {
        timestamp:new Date('2019-07-08T11:10:00Z') ,
        direction: 239.2
    },
    {
        timestamp:new Date('2019-07-08T11:11:00Z') ,
        direction: 235.1
    },
    {
        timestamp:new Date('2019-07-08T11:12:00Z') ,
        direction: 238.2
    },
    {
        timestamp:new Date('2019-07-08T11:13:00Z') ,
        direction: 237.5
    },
    {
        timestamp:new Date('2019-07-08T11:14:00Z') ,
        direction: 242.4
    },
    {
        timestamp:new Date('2019-07-08T11:15:00Z') ,
        direction: 238.5
    },
    {
        timestamp:new Date('2019-07-08T11:16:00Z') ,
        direction: 231
    },
    {
        timestamp:new Date('2019-07-08T11:17:00Z') ,
        direction: 245.1
    },
    {
        timestamp:new Date('2019-07-08T11:18:00Z') ,
        direction: 242
    },
    {
        timestamp:new Date('2019-07-08T11:19:00Z') ,
        direction: 244.2
    },
    {
        timestamp:new Date('2019-07-08T11:20:00Z') ,
        direction: 237.4
    },
    {
        timestamp:new Date('2019-07-08T11:21:00Z') ,
        direction: 226.9
    },
    {
        timestamp:new Date('2019-07-08T11:22:00Z') ,
        direction: 239.5
    },
    {
        timestamp:new Date('2019-07-08T11:23:00Z') ,
        direction: 241.6
    },
    {
        timestamp:new Date('2019-07-08T11:24:00Z') ,
        direction: 231.7
    },
    {
        timestamp:new Date('2019-07-08T11:25:00Z') ,
        direction: 246.4
    },
    {
        timestamp:new Date('2019-07-08T11:26:00Z') ,
        direction: 233.3
    },
    {
        timestamp:new Date('2019-07-08T11:27:00Z') ,
        direction: 248
    },
    {
        timestamp:new Date('2019-07-08T11:28:00Z') ,
        direction: 245.6
    },
    {
        timestamp:new Date('2019-07-08T11:29:00Z') ,
        direction: 245.9
    },
    {
        timestamp:new Date('2019-07-08T11:30:00Z') ,
        direction: 248
    },
    {
        timestamp:new Date('2019-07-08T11:31:00Z') ,
        direction: 251.8
    },
    {
        timestamp:new Date('2019-07-08T11:32:00Z') ,
        direction: 249.7
    },
    {
        timestamp:new Date('2019-07-08T11:33:00Z') ,
        direction: 258.5
    },
    {
        timestamp:new Date('2019-07-08T11:34:00Z') ,
        direction: 247.4
    },
    {
        timestamp:new Date('2019-07-08T11:35:00Z') ,
        direction: 247.3
    },
    {
        timestamp:new Date('2019-07-08T11:36:00Z') ,
        direction: 245.7
    },
    {
        timestamp:new Date('2019-07-08T11:37:00Z') ,
        direction: 232.4
    },
    {
        timestamp:new Date('2019-07-08T11:38:00Z') ,
        direction: 217.7
    },
    {
        timestamp:new Date('2019-07-08T11:39:00Z') ,
        direction: 239.7
    },
    {
        timestamp:new Date('2019-07-08T11:40:00Z') ,
        direction: 208
    },
    {
        timestamp:new Date('2019-07-08T11:41:00Z') ,
        direction: 201.5
    },
    {
        timestamp:new Date('2019-07-08T11:42:00Z') ,
        direction: 238.1
    },
    {
        timestamp:new Date('2019-07-08T11:43:00Z') ,
        direction: 249.1
    },
    {
        timestamp:new Date('2019-07-08T11:44:00Z') ,
        direction: 241.4
    },
    {
        timestamp:new Date('2019-07-08T11:45:00Z') ,
        direction: 236.6
    },
    {
        timestamp:new Date('2019-07-08T11:46:00Z') ,
        direction: 242.7
    },
    {
        timestamp:new Date('2019-07-08T11:47:00Z') ,
        direction: 241.7
    },
    {
        timestamp:new Date('2019-07-08T11:48:00Z') ,
        direction: 229.1
    },
    {
        timestamp:new Date('2019-07-08T11:49:00Z') ,
        direction: 249.5
    },
    {
        timestamp:new Date('2019-07-08T11:50:00Z') ,
        direction: 236.7
    },
    {
        timestamp:new Date('2019-07-08T11:51:00Z') ,
        direction: 235.4
    },
    {
        timestamp:new Date('2019-07-08T11:52:00Z') ,
        direction: 236
    },
    {
        timestamp:new Date('2019-07-08T11:53:00Z') ,
        direction: 239.8
    },
    {
        timestamp:new Date('2019-07-08T11:54:00Z') ,
        direction: 240.7
    },
    {
        timestamp:new Date('2019-07-08T11:55:00Z') ,
        direction: 221.7
    },
    {
        timestamp:new Date('2019-07-08T11:56:00Z') ,
        direction: 243.5
    },
    {
        timestamp:new Date('2019-07-08T11:57:00Z') ,
        direction: 244.8
    },
    {
        timestamp:new Date('2019-07-08T11:58:00Z') ,
        direction: 239.3
    },
    {
        timestamp:new Date('2019-07-08T11:59:00Z') ,
        direction: 239.4
    },
    {
        timestamp:new Date('2019-07-08T12:00:00Z') ,
        direction: 238.1
    },
    {
        timestamp:new Date('2019-07-08T12:01:00Z') ,
        direction: 226.3
    },
    {
        timestamp:new Date('2019-07-08T12:02:00Z') ,
        direction: 244.7
    },
    {
        timestamp:new Date('2019-07-08T12:03:00Z') ,
        direction: 243.7
    },
    {
        timestamp:new Date('2019-07-08T12:04:00Z') ,
        direction: 240.8
    },
    {
        timestamp:new Date('2019-07-08T12:05:00Z') ,
        direction: 239.2
    },
    {
        timestamp:new Date('2019-07-08T12:06:00Z') ,
        direction: 236.1
    },
    {
        timestamp:new Date('2019-07-08T12:07:00Z') ,
        direction: 240.3
    },
    {
        timestamp:new Date('2019-07-08T12:08:00Z') ,
        direction: 238.4
    },
    {
        timestamp:new Date('2019-07-08T12:09:00Z') ,
        direction: 246
    },
    {
        timestamp:new Date('2019-07-08T12:10:00Z') ,
        direction: 239.1
    },
    {
        timestamp:new Date('2019-07-08T12:11:00Z') ,
        direction: 241.6
    },
    {
        timestamp:new Date('2019-07-08T12:12:00Z') ,
        direction: 244.1
    },
    {
        timestamp:new Date('2019-07-08T12:13:00Z') ,
        direction: 240.7
    },
    {
        timestamp:new Date('2019-07-08T12:14:00Z') ,
        direction: 237.9
    },
    {
        timestamp:new Date('2019-07-08T12:15:00Z') ,
        direction: 241.6
    },
    {
        timestamp:new Date('2019-07-08T12:16:00Z') ,
        direction: 235.7
    },
    {
        timestamp:new Date('2019-07-08T12:17:00Z') ,
        direction: 236.2
    },
    {
        timestamp:new Date('2019-07-08T12:18:00Z') ,
        direction: 240.2
    },
    {
        timestamp:new Date('2019-07-08T12:19:00Z') ,
        direction: 231.4
    },
    {
        timestamp:new Date('2019-07-08T12:20:00Z') ,
        direction: 237.4
    },
    {
        timestamp:new Date('2019-07-08T12:21:00Z') ,
        direction: 243.2
    },
    {
        timestamp:new Date('2019-07-08T12:22:00Z') ,
        direction: 234.1
    },
    {
        timestamp:new Date('2019-07-08T12:23:00Z') ,
        direction: 239.1
    },
    {
        timestamp:new Date('2019-07-08T12:24:00Z') ,
        direction: 251.6
    },
    {
        timestamp:new Date('2019-07-08T12:25:00Z') ,
        direction: 244.8
    },
    {
        timestamp:new Date('2019-07-08T12:26:00Z') ,
        direction: 253.6
    },
    {
        timestamp:new Date('2019-07-08T12:27:00Z') ,
        direction: 232.1
    },
    {
        timestamp:new Date('2019-07-08T12:28:00Z') ,
        direction: 244.3
    },
    {
        timestamp:new Date('2019-07-08T12:29:00Z') ,
        direction: 241.1
    },
    {
        timestamp:new Date('2019-07-08T12:30:00Z') ,
        direction: 243.5
    },
    {
        timestamp:new Date('2019-07-08T12:31:00Z') ,
        direction: 234.6
    },
    {
        timestamp:new Date('2019-07-08T12:32:00Z') ,
        direction: 241.7
    },
    {
        timestamp:new Date('2019-07-08T12:33:00Z') ,
        direction: 238.8
    },
    {
        timestamp:new Date('2019-07-08T12:34:00Z') ,
        direction: 233.6
    },
    {
        timestamp:new Date('2019-07-08T12:35:00Z') ,
        direction: 239
    },
    {
        timestamp:new Date('2019-07-08T12:36:00Z') ,
        direction: 239.3
    },
    {
        timestamp:new Date('2019-07-08T12:37:00Z') ,
        direction: 236.3
    },
    {
        timestamp:new Date('2019-07-08T12:38:00Z') ,
        direction: 241.9
    },
    {
        timestamp:new Date('2019-07-08T12:39:00Z') ,
        direction: 230.7
    },
    {
        timestamp:new Date('2019-07-08T12:40:00Z') ,
        direction: 245
    },
    {
        timestamp:new Date('2019-07-08T12:41:00Z') ,
        direction: 236.7
    },
    {
        timestamp:new Date('2019-07-08T12:42:00Z') ,
        direction: 242.2
    },
    {
        timestamp:new Date('2019-07-08T12:43:00Z') ,
        direction: 243.3
    },
    {
        timestamp:new Date('2019-07-08T12:44:00Z') ,
        direction: 237
    },
    {
        timestamp:new Date('2019-07-08T12:45:00Z') ,
        direction: 235.7
    },
    {
        timestamp:new Date('2019-07-08T12:46:00Z') ,
        direction: 241.8
    },
    {
        timestamp:new Date('2019-07-08T12:47:00Z') ,
        direction: 241.7
    },
    {
        timestamp:new Date('2019-07-08T12:48:00Z') ,
        direction: 247
    },
    {
        timestamp:new Date('2019-07-08T12:49:00Z') ,
        direction: 242.6
    },
    {
        timestamp:new Date('2019-07-08T12:50:00Z') ,
        direction: 242.3
    },
    {
        timestamp:new Date('2019-07-08T12:51:00Z') ,
        direction: 245
    },
    {
        timestamp:new Date('2019-07-08T12:52:00Z') ,
        direction: 243.8
    },
    {
        timestamp:new Date('2019-07-08T12:53:00Z') ,
        direction: 236.2
    },
    {
        timestamp:new Date('2019-07-08T12:54:00Z') ,
        direction: 244.8
    },
    {
        timestamp:new Date('2019-07-08T12:55:00Z') ,
        direction: 251
    },
    {
        timestamp:new Date('2019-07-08T12:56:00Z') ,
        direction: 253.1
    },
    {
        timestamp:new Date('2019-07-08T12:57:00Z') ,
        direction: 245.2
    },
    {
        timestamp:new Date('2019-07-08T12:58:00Z') ,
        direction: 238.4
    },
    {
        timestamp:new Date('2019-07-08T12:59:00Z') ,
        direction: 243.6
    },
    {
        timestamp:new Date('2019-07-08T13:00:00Z') ,
        direction: 230.2
    },
    {
        timestamp:new Date('2019-07-08T13:01:00Z') ,
        direction: 245.7
    },
    {
        timestamp:new Date('2019-07-08T13:02:00Z') ,
        direction: 246.3
    },
    {
        timestamp:new Date('2019-07-08T13:03:00Z') ,
        direction: 245.6
    },
    {
        timestamp:new Date('2019-07-08T13:04:00Z') ,
        direction: 236.4
    },
    {
        timestamp:new Date('2019-07-08T13:05:00Z') ,
        direction: 237.8
    },
    {
        timestamp:new Date('2019-07-08T13:06:00Z') ,
        direction: 248
    },
    {
        timestamp:new Date('2019-07-08T13:07:00Z') ,
        direction: 246.5
    },
    {
        timestamp:new Date('2019-07-08T13:08:00Z') ,
        direction: 225.7
    },
    {
        timestamp:new Date('2019-07-08T13:09:00Z') ,
        direction: 247.8
    },
    {
        timestamp:new Date('2019-07-08T13:10:00Z') ,
        direction: 237
    },
    {
        timestamp:new Date('2019-07-08T13:11:00Z') ,
        direction: 245.5
    },
    {
        timestamp:new Date('2019-07-08T13:12:00Z') ,
        direction: 243.2
    },
    {
        timestamp:new Date('2019-07-08T13:13:00Z') ,
        direction: 263.6
    },
    {
        timestamp:new Date('2019-07-08T13:14:00Z') ,
        direction: 263.1
    },
    {
        timestamp:new Date('2019-07-08T13:15:00Z') ,
        direction: 242.2
    },
    {
        timestamp:new Date('2019-07-08T13:16:00Z') ,
        direction: 249.3
    },
    {
        timestamp:new Date('2019-07-08T13:17:00Z') ,
        direction: 250.5
    },
    {
        timestamp:new Date('2019-07-08T13:18:00Z') ,
        direction: 239.3
    },
    {
        timestamp:new Date('2019-07-08T13:19:00Z') ,
        direction: 228.9
    },
    {
        timestamp:new Date('2019-07-08T13:20:00Z') ,
        direction: 235.8
    },
    {
        timestamp:new Date('2019-07-08T13:21:00Z') ,
        direction: 239.3
    },
    {
        timestamp:new Date('2019-07-08T13:22:00Z') ,
        direction: 248.4
    },
    {
        timestamp:new Date('2019-07-08T13:23:00Z') ,
        direction: 240.1
    },
    {
        timestamp:new Date('2019-07-08T13:24:00Z') ,
        direction: 249
    },
    {
        timestamp:new Date('2019-07-08T13:25:00Z') ,
        direction: 262.4
    },
    {
        timestamp:new Date('2019-07-08T13:26:00Z') ,
        direction: 250.1
    },
    {
        timestamp:new Date('2019-07-08T13:27:00Z') ,
        direction: 240.2
    },
    {
        timestamp:new Date('2019-07-08T13:28:00Z') ,
        direction: 237.1
    },
    {
        timestamp:new Date('2019-07-08T13:29:00Z') ,
        direction: 248.6
    },
    {
        timestamp:new Date('2019-07-08T13:30:00Z') ,
        direction: 264.6
    },
    {
        timestamp:new Date('2019-07-08T13:31:00Z') ,
        direction: 260.9
    },
    {
        timestamp:new Date('2019-07-08T13:32:00Z') ,
        direction: 234
    },
    {
        timestamp:new Date('2019-07-08T13:33:00Z') ,
        direction: 230
    },
    {
        timestamp:new Date('2019-07-08T13:34:00Z') ,
        direction: 251.4
    },
    {
        timestamp:new Date('2019-07-08T13:35:00Z') ,
        direction: 249.5
    },
    {
        timestamp:new Date('2019-07-08T13:36:00Z') ,
        direction: 262.3
    },
    {
        timestamp:new Date('2019-07-08T13:37:00Z') ,
        direction: 262.9
    },
    {
        timestamp:new Date('2019-07-08T13:38:00Z') ,
        direction: 245.5
    },
    {
        timestamp:new Date('2019-07-08T13:39:00Z') ,
        direction: 242
    },
    {
        timestamp:new Date('2019-07-08T13:40:00Z') ,
        direction: 245.3
    },
    {
        timestamp:new Date('2019-07-08T13:41:00Z') ,
        direction: 249.3
    },
    {
        timestamp:new Date('2019-07-08T13:42:00Z') ,
        direction: 245.3
    },
    {
        timestamp:new Date('2019-07-08T13:43:00Z') ,
        direction: 243.2
    },
    {
        timestamp:new Date('2019-07-08T13:44:00Z') ,
        direction: 242.6
    },
    {
        timestamp:new Date('2019-07-08T13:45:00Z') ,
        direction: 258.2
    },
    {
        timestamp:new Date('2019-07-08T13:46:00Z') ,
        direction: 239
    },
    {
        timestamp:new Date('2019-07-08T13:47:00Z') ,
        direction: 265.3
    },
    {
        timestamp:new Date('2019-07-08T13:48:00Z') ,
        direction: 261.8
    },
    {
        timestamp:new Date('2019-07-08T13:49:00Z') ,
        direction: 263.9
    },
    {
        timestamp:new Date('2019-07-08T13:50:00Z') ,
        direction: 250
    },
    {
        timestamp:new Date('2019-07-08T13:51:00Z') ,
        direction: 277.5
    },
    {
        timestamp:new Date('2019-07-08T13:52:00Z') ,
        direction: 289.4
    },
    {
        timestamp:new Date('2019-07-08T13:53:00Z') ,
        direction: 281.7
    },
    {
        timestamp:new Date('2019-07-08T13:54:00Z') ,
        direction: 202.4
    },
    {
        timestamp:new Date('2019-07-08T13:55:00Z') ,
        direction: 255.4
    },
    {
        timestamp:new Date('2019-07-08T13:56:00Z') ,
        direction: 238.3
    },
    {
        timestamp:new Date('2019-07-08T13:57:00Z') ,
        direction: 235.5
    },
    {
        timestamp:new Date('2019-07-08T13:58:00Z') ,
        direction: 236.8
    },
    {
        timestamp:new Date('2019-07-08T13:59:00Z') ,
        direction: 241.2
    },
    {
        timestamp:new Date('2019-07-08T14:00:00Z') ,
        direction: 233.2
    },
    {
        timestamp:new Date('2019-07-08T14:01:00Z') ,
        direction: 238.9
    },
    {
        timestamp:new Date('2019-07-08T14:02:00Z') ,
        direction: 238.2
    },
    {
        timestamp:new Date('2019-07-08T14:03:00Z') ,
        direction: 234.8
    },
    {
        timestamp:new Date('2019-07-08T14:04:00Z') ,
        direction: 243.3
    },
    {
        timestamp:new Date('2019-07-08T14:05:00Z') ,
        direction: 251.7
    },
    {
        timestamp:new Date('2019-07-08T14:06:00Z') ,
        direction: 244.7
    },
    {
        timestamp:new Date('2019-07-08T14:07:00Z') ,
        direction: 247.4
    },
    {
        timestamp:new Date('2019-07-08T14:08:00Z') ,
        direction: 255.3
    },
    {
        timestamp:new Date('2019-07-08T14:09:00Z') ,
        direction: 252
    },
    {
        timestamp:new Date('2019-07-08T14:10:00Z') ,
        direction: 246.9
    },
    {
        timestamp:new Date('2019-07-08T14:11:00Z') ,
        direction: 256.3
    },
    {
        timestamp:new Date('2019-07-08T14:12:00Z') ,
        direction: 254.4
    },
    {
        timestamp:new Date('2019-07-08T14:13:00Z') ,
        direction: 261.2
    },
    {
        timestamp:new Date('2019-07-08T14:14:00Z') ,
        direction: 263.6
    },
    {
        timestamp:new Date('2019-07-08T14:15:00Z') ,
        direction: 254.3
    },
    {
        timestamp:new Date('2019-07-08T14:16:00Z') ,
        direction: 245.9
    },
    {
        timestamp:new Date('2019-07-08T14:17:00Z') ,
        direction: 236.4
    },
    {
        timestamp:new Date('2019-07-08T14:18:00Z') ,
        direction: 257.3
    },
    {
        timestamp:new Date('2019-07-08T14:19:00Z') ,
        direction: 261.7
    },
    {
        timestamp:new Date('2019-07-08T14:20:00Z') ,
        direction: 251.1
    },
    {
        timestamp:new Date('2019-07-08T14:21:00Z') ,
        direction: 253.6
    },
    {
        timestamp:new Date('2019-07-08T14:22:00Z') ,
        direction: 261
    },
    {
        timestamp:new Date('2019-07-08T14:23:00Z') ,
        direction: 248.7
    },
    {
        timestamp:new Date('2019-07-08T14:24:00Z') ,
        direction: 254.3
    },
    {
        timestamp:new Date('2019-07-08T14:25:00Z') ,
        direction: 248.6
    },
    {
        timestamp:new Date('2019-07-08T14:26:00Z') ,
        direction: 238.5
    },
    {
        timestamp:new Date('2019-07-08T14:27:00Z') ,
        direction: 254.5
    },
    {
        timestamp:new Date('2019-07-08T14:28:00Z') ,
        direction: 256.7
    },
    {
        timestamp:new Date('2019-07-08T14:29:00Z') ,
        direction: 244.6
    },
    {
        timestamp:new Date('2019-07-08T14:30:00Z') ,
        direction: 250.1
    },
    {
        timestamp:new Date('2019-07-08T14:31:00Z') ,
        direction: 254.1
    },
    {
        timestamp:new Date('2019-07-08T14:32:00Z') ,
        direction: 252.1
    },
    {
        timestamp:new Date('2019-07-08T14:33:00Z') ,
        direction: 240.6
    }];
}
export class Fengxiang{
  timestamp: Date;
  direction: number; 
}
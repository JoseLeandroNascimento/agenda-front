import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { EMonthIndex } from '../../enum/emonth';
import { MonthCalendar } from '../../models/month-calendar';
import { Event } from '../../models/event';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  public monthCalendar: MonthCalendar = <MonthCalendar>{};
  public dayWeek: Array<string> = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  public mesName:Array<string> = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  @Input()
  public year:number|undefined = undefined;

  @Input()
  public month:EMonthIndex|undefined = undefined;

  @Input()
  public events: Array<Event> = [];

  @Input()
  public width: string = '';

  @Input()
  public height: string = '';

  // Eventos
  @Output()
  public selectDay: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
    if(!this.year || !this.month){

      let dateCurrent:Date = new Date();

      this.year = dateCurrent.getFullYear();
      this.month = dateCurrent.getMonth();
    }
    
    
    this.loadCalendar();
  }

  public loadCalendar():void{

    if(this.year!=undefined && this.month != undefined){

      this.monthCalendar = new MonthCalendar(this.year,this.month);
  
      this.events.map((evento:Event) =>{
        this.monthCalendar.addEvent(evento);
      })
    }
  }
  public getEvents(day:number):void{

    let eventos: Array<Event> = this.monthCalendar.getEvents(day);
    console.log(eventos);
    
    this.selectDay.emit({events:eventos});
  }

  public nextMonth():void{

    if(this.month!= undefined && this.year != undefined){

      if(this.month === 11){

        this.month = 0;
        this.year++;

      }else{

        this.month ++;
      }

      this.loadCalendar();
    }
  }

  public previMonth():void{

    if(this.month!= undefined && this.year != undefined){

      if(this.month === 0){

        this.month = 11;
        this.year--;

      }else{

        this.month --;
      }

      this.loadCalendar();
    }
  }
}

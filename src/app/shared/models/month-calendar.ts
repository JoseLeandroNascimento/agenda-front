import { EMonthIndex } from "../enum/emonth";
import { Event } from "./event";

export class MonthCalendar {

    private yearCurrent: number = <number>{};
    private monthCurrent: EMonthIndex = <EMonthIndex>{};
    private events: Array<Event> = [];


    constructor(year:number,month:EMonthIndex){

        this.yearCurrent = year;
        this.monthCurrent = month;

    }

    public getMonth():EMonthIndex{

        return this.monthCurrent;
    }

    public getYear():number{

        return this.yearCurrent;
    }

    // Obtem a quantidade de dias do mês
    public getCountDaysMonth():number{

        return new Date(this.yearCurrent,this.monthCurrent+1,0).getDate();
    }

    public getMatrizMonth(): Array<Array<number>>{

        let countDaysMonth:number = this.getCountDaysMonth();
        let matrizMonth:Array<Array<number>> = [];

        let semana:Array<number> = [0,0,0,0,0,0,0];
        for(let dia =1; dia <=countDaysMonth; dia++){

            let indexDiaSemana:number = new Date(this.yearCurrent,this.monthCurrent,dia).getDay();
            semana[indexDiaSemana] = dia;

            if(indexDiaSemana === 6 || dia === countDaysMonth){

                matrizMonth.push(semana);
                semana = [0,0,0,0,0,0,0];
            }
        }

        return matrizMonth;
    }

    public addEvent(event:Event):void{

        
        if(event.date.getDate() > this.getCountDaysMonth()){

            throw new Error("Day incorrect");
        }

        this.events.push(event);
    }

    public getEvents(day:number):Array<Event>{

        return this.events.filter(items=> items.date.getDate() === day);
        
    }

}

import { Observable, ReplaySubject } from 'rxjs';



export class EventServiceProvider{
  constructor(){
    this.eventSubject = new ReplaySubject();  
    this.events = [];
  }


  getEvents(){
    return this.eventSubject.asObservable();
  }


  pushEvent(event){
    this.events.push(event);
    this.eventSubject.next(this.events);
  }


}


export const eventService = new EventServiceProvider();


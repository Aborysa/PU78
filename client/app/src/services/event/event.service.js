import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_EVENTS } from '../common/constants';
import { http } from '../net';


export class EventServiceProvider{
  constructor(){
    this.eventSubject = new ReplaySubject();  
    this.events = [];
  }


  getEvents(){
    return this.eventSubject.asObservable();
  }

  refresh(){
    http.get(`${API_BASE}${API_EVENTS}`).subscribe((res)=>{
      console.log(res);
    });
  }

  pushEvent(event){
    http.post(`${API_BASE}${API_EVENTS}`).subscribe((res) => {
      console.log(res);
      this.events.push(event);
      this.eventSubject.next(this.events);
    });
  }

}


export const eventService = new EventServiceProvider();


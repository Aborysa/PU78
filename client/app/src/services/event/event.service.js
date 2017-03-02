import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_EVENTS } from 'common/constants';
import { http } from 'services/net';


export class EventServiceProvider{
  constructor(){
    this.eventSubject = new ReplaySubject();  
    this._events = [];
  }


  getEvents(){
    return this.eventSubject.asObservable();
  }

  set events(events){
    this._events = events;
    this.eventSubject.next(events);
  }
  get events(){
    return this._events;
  }
  refresh(){
    http.get(`${API_BASE}${API_EVENTS}`).subscribe((res)=>{
      this.events = res;
    });
  }

  pushEvent(event){
    http.post(`${API_BASE}${API_EVENTS}`).subscribe((res) => {
      this.events = this.events.push(event).slice();
      this.eventSubject.next(this.events);
    });
  }
}


export const eventService = new EventServiceProvider();


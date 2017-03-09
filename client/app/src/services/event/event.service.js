import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_EVENTS } from 'common/constants';
import { http } from 'services/net';

import { jsonToEvent } from './event';

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
    console.log("Pushing new events",events);
    this.eventSubject.next(events);
  }
  get events(){
    return this._events;
  }
  refresh(){
    http.get(`${API_BASE}${API_EVENTS}`)
      .map(ret => {
        let events = [];
        for(let e of ret){
          events.push(jsonToEvent(e));
        }
        return events;
      })
      .subscribe((res)=>{
        console.log(res);
        this.events = res;
      });
  }

  pushEvent(event){
    http.post(`${API_BASE}${API_EVENTS}`,event.serverEvent).subscribe((res) => {
      this.events.push(event);
      this.events = this.events.slice();
    });
  }
}


export const eventService = new EventServiceProvider();


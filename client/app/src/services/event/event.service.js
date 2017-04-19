import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_EVENTS } from 'common/constants';
import { http } from 'services/net';
import { jsonToEvent } from './event';


export class EventServiceProvider{
  constructor(){
    this.eventSubject = new ReplaySubject();
    this._events = [];
    this._eventCache = {};
  }


  getEvents(){
    return this.eventSubject.asObservable();
  }
  getEvent(id){
    return this._eventCache[id];
  }
  set events(events){
    this._events = events;
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
          let ce = jsonToEvent(e);
          events.push(ce);
          this._eventCache[ce.id] = ce;
        }
        return events;
      })
      .subscribe((res)=>{
        this.events = res;
      });
  }

  updateEvent(id,event){
    http.patch(`${API_BASE}${API_EVENTS}`,event.patchEvent).subscribe((res) => {
      $.notify("Endret", {type: 'success', z_index: 10000, placement: {align: "center"}});
      this._eventCache[id] = event;
      let events = [];
      for(let i in this._eventCache){
        events.push(this._eventCache[i]);
      }
      this.events = events;
    });
  }

  deleteEvent(event){
    http.delete(`${API_BASE}${API_EVENTS}`,{
      id: event.id
    }).subscribe((res) => {
      $.notify("Slettet",{type: 'success', z_index: 10000, placement: {align: "center"}});
      delete this._eventCache[event.id];
      let events = [];
      for(let i in this._eventCache){
        events.push(this._eventCache[i]);
      }
      this.events = events;
    })
  }

  pushEvent(event){
    http.post(`${API_BASE}${API_EVENTS}`,event.serverEvent).subscribe((res) => {
      event.id = res.id
      $.notify("Lagret", {type: 'success', z_index: 10000, placement: {align: "center"}});
      this.events.push(event);
      this.events = this.events.slice();
      this._eventCache[event.id] = event;
    });
  }
}


export const eventService = new EventServiceProvider();

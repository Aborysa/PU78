import { Observable, ReplaySubject } from 'rxjs';

import { http } from 'services/net';
import { API_BASE,API_USER } from 'common/constants';

import { User } from './user';

export class UserServiceProvider{
  constructor(){
    this.userSubject = new ReplaySubject();
    this.puser = null;
    this.refresh();
    http.onError(400).debounceTime(500).subscribe(() => {
      this.refresh();
    });
  }
  refresh(){
    http.get(`${API_BASE}${API_USER}`).subscribe((data)=>{
      let u;
      if(data && data.data){
        u = new User(data.token.id_token,"",data.data.name);
      }
      if( ((u && this.puser) && u.id != this.puser.id) || u != this.puser){
        if(!u && this.puser){
          $.notify("Du er ikke lengre logget in!",{delay:2000,type:'info',z_index:10000, placement: {align: "center"}});
        }
        this.userSubject.next(u);
      }
      this.puser = u;
    });
  }
  getUser(){
    return this.userSubject.asObservable();
  }
}

export const userService = new UserServiceProvider(); 
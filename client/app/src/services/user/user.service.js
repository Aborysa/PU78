import { Observable, ReplaySubject } from 'rxjs';

import { http } from '../net';
import { API_BASE,API_USER } from '../../common/constants';

import { User } from './user';

export class UserServiceProvider{
  constructor(){
    this.userSubject = new ReplaySubject();
    this.refresh();
  }
  refresh(){
    http.get(`${API_BASE}${API_USER}`).subscribe((data)=>{
      let u;
      if(data && data.data){
        u = new User(data.token.id_token,"",data.data.name);
      }
      this.userSubject.next(u);
    });
  }
  getUser(){
    return this.userSubject.asObservable();
  }
}

export const userService = new UserServiceProvider(); 
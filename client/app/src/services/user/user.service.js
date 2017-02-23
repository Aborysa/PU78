import { Observable, ReplaySubject } from 'rxjs';

import { http } from '../net';
import { API_BASE,API_USER } from '../../common/constants';

export class UserServiceProvider{
  constructor(){
    this.userSubject = new ReplaySubject();
    this.refresh();
  }
  refresh(){
    http.get(`${API_BASE}${API_USER}`).subscribe((data)=>{
      console.log(data);
      this.userSubject.next(data);
    });
  }
  getUser(){
    return this.userSubject.asObservable();
  }
}

export const userService = new UserServiceProvider(); 
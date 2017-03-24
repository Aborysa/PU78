import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_COURSES, API_USER_COURSES  } from 'common/constants';
import { http } from 'services/net';

import { jsonToCourse } from './course.js';

export class CourseServiceProvider{
  constructor(){
    this.userCourseSubject = new ReplaySubject();
    this.userCoursesList = [];
  }


  set userCourses(list){
    this.userCoursesList = list;
    console.log("Next userCourses",list);
    this.userCourseSubject.next(list);
  }
  searchCourse(searchString){
    if(searchString){
      return http.get(`${API_BASE}${API_COURSES}`,{
        q: searchString
      }).map(r => {
        let ret = [];
        for(let c of r){
          ret.push(jsonToCourse(c));
        }
        return ret;
      });
    }
    return Observable.of([]);
  }

  refresh(){
    console.log("Refresh courses");
    http.get(`${API_BASE}${API_USER_COURSES}`)
      .subscribe(r => {
        let ret = [];
        for(let c of r){
          ret.push(jsonToCourse(c));
        }
        this.userCourses = ret;
      });
  }

  getUserCourses(){
    return this.userCourseSubject.asObservable();
  }

  addUserCourse(course){
    return http.post(`${API_BASE}${API_USER_COURSES}`,{
      id: course.id,
      role: "student"
    }).subscribe((ret)=>{
      this.refresh();
    });
  }

  deleteUserCourse(course){
    return http.delete(`${API_BASE}${API_USER_COURSES}`,{
      id: course.id
    }).subscribe((ret) => {
      this.refresh();
    });

  }
}


export const courseService = new CourseServiceProvider();

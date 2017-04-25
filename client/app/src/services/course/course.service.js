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
      let courses = this.userCoursesList.slice();
      courses.push(course);
      this.userCourses = courses;
      $.notify("Fag registrert",{delay:1000,type:'success',z_index:10000, placement: {align: "center"}});  
    },() => {
      $.notify("Noe gikk galt! Fag ble ikke registrert",{delay:3000,type:'warning',z_index:10000, placement: {align: "center"}});        
    });
  }

  deleteUserCourse(course){
    return http.delete(`${API_BASE}${API_USER_COURSES}`,{
      id: course.id
    }).subscribe((ret) => {
      this.userCourses = this.userCoursesList.slice().filter(e => e.id != course.id);
    },() => {
      $.notify("Noe gikk galt! Fag ble ikke slettet",{delay:3000,type:'warning',z_index:10000, placement: {align: "center"}});        
    });

  }
}


export const courseService = new CourseServiceProvider();

import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_COURSES, API_USER_COURSES  } from 'common/constants';
import { http } from 'services/net';

import { jsonToCourse } from 'course';

export class CourseServiceProvider{
  constructor(){
  }


  searchCourse(searchString){
    if(searchString){
      return http.get(`${API_BASE}${API_COURSES}`,{
        q: searchString
      }).map(r => {
        let ret = [];
        for(let c of r){
          ret.push(jsonToCourse(r));
        }
        return ret;
      });
    }
  }
  getUserCourses(){
    return http.get(`${API_BASE}${API_USER_COURSES}`)
      .map(r => {
        let ret = [];
        for(let c of r){
          ret.push(jsonToCourse(r));
        }
        return ret;
      });
  }
  
  addUserCourse(course){
    return http.post(`${API_BASE}${API_USER_COURSES}`,{
      id: course.id,
      role: "student"
    });
  }

  deleteUserCourse(course){
    return http.delete(`${API_BASE}${API_USER_COURSES}`,{
      id: course.id
    });
    
  }
}


export const courseService = new CourseServiceProvider();


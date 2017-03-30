import { Observable, ReplaySubject } from 'rxjs';
import { API_BASE, API_LECTURES } from 'common/constants';
import { http } from 'services/net';
import { jsonToLecture } from './lecture';


export class LectureServiceProvider{
  constructor(){
    this.eventSubject = new ReplaySubject();  
    this._lectures = {};
    this._lecturesbyid = {};
  }
  //Only works on cached lectures
  getLectureById(id){
    return this._lecturesbyid[id];
  }
  getLectures(course){
    if(this._lectures[course]){
      console.log("Cashed", this._lectures[course]);
      return Observable.of(this._lectures[course]);
    }
    return http.get(`${API_BASE}${API_LECTURES}${course}`).map(ret => {
      let lectures = [];
      for(let l of ret){
        let lecture = jsonToLecture(l);
        lectures.push(lecture);
        this._lecturesbyid[lecture.id] = lecture; 
      }
      this._lectures[course] = lectures;
      return lectures;
    });
  }
  
}


export const lectureService = new LectureServiceProvider();


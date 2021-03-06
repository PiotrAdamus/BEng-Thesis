import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Course } from '../../../core/models/course';
import {Observable} from 'rxjs/internal/Observable';
import {Pagination} from '../../../core/models/pagination';
import {AddUserToCourseRequest} from '../../../core/models/add-user-to-course-request';
import { UserPresence } from '../../../core/models/user-presence';
import { CourseDay } from '../../../core/models/course-day';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseRestService {

  constructor(private http: HttpClient) { }

  addCourse(course: Course) {
    return this.http.post(`${environment.restApiUrl}/courses`, course);
  }

  getCourses(page: number = 1): Observable<Pagination<Course>> {
    return this.http.get<Pagination<Course>>(`${environment.restApiUrl}/courses/&page=${page}`)
  }

  addUserToCourse(courseId: string, data: AddUserToCourseRequest): Observable<Course> {
    return this.http.put<Course>(`${environment.restApiUrl}/courses/${courseId}/users`, data)
  }

  getActivePresences(courseId: string): Observable<CourseDay> {
    return this.http.get<CourseDay>(`${environment.restApiUrl}/courses/${courseId}/active-presences`)
  }

  getCourseDays(courseId: string) {
    return this.http.get<CourseDay[]>(`${environment.restApiUrl}/courses/${courseId}/courseDays`)
  }

  getPresences(courseId: string) {
    return this.http.get<UserPresence[]>(`${environment.restApiUrl}/courses/${courseId}/presences`)
  }

  updateCourse(courseId: string, course: Course) {
    return this.http.put<Course>(`${environment.restApiUrl}/instructor/course/${courseId}`, {course})
  }

  updateCourseDays(courseId: string, courseDays: CourseDay[]) {
    return this.http.put<Course>(`${environment.restApiUrl}/instructor/course/${courseId}`, {courseDays})
  }
}

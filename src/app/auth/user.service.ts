import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSubject = new BehaviorSubject<User>(null);
  detailUserSubject: Subject<any> = new Subject;


  constructor(private http:HttpClient) { }

  setCurrentUser(user: User){
    this.currentUserSubject.next(user);
  }

  public get currentUser(): User{
    return this.currentUserSubject.value;
  }

  onUpdatedUser(updatedProfile, id){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.put(`http://localhost:3000/api/v1/users/${id}`, updatedProfile, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }

  updatedUser(editUser:any){

  }
}

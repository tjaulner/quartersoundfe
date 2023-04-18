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
  playlistUserSubject = new BehaviorSubject<[]>(null);

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
  // using in music search component to load user's playlist with user info
  // not sure why other current user subject doesnt already do this??
  pullUserPlaylists(id) {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).subscribe((res:any)=>{
      if(res.success){
        //console.log('pull user method:', res.payload.user)
        //this.setCurrentUser(res.payload.user);
        //console.log(res);
        this.currentUserSubject.next(res.payload.user)

      }
    })
  }

  //pull current user for playlist stuff 4/3 - i'm sure there's a better way to do this, but the other tests were not pulling user.playlists info for some reason?
  getCurrentUser(id){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).subscribe((res:any)=>{
      if(res.success){
        //console.log('get current user method in user service is:', res.payload.user.playlists)
        //this.playlistUserSubject = res.payload.user.playlists;
        //console.log(this.playlistUserSubject)
        //this.setPlaylistUserSubject(this.playlistUserSubject)
        this.playlistUserSubject.next(res.payload.user.playlists)
      }
    })
  }

  setPlaylistUserSubject(data: any){
    this.playlistUserSubject.next(data);
  }
}

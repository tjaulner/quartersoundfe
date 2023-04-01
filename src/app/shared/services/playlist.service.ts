import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


const URL = 'http://localhost:3000/api/v1/';


@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  //these are for setting/resetting the playlist page only
  currentUserPlaylist = [];
  currentUserPlaylistsSubject: Subject<any> = new Subject;
  detailPlaylistSubject: Subject<any> = new Subject;

  constructor(private http:HttpClient, private authService:AuthService) { }

  // this is for the 5 "suggested playlists" on the home page
  fetchPlaylists(){
    return this.http.get(`${URL}playlists/home`)
  }

  // this is for the 5 "you may know" on the home page
  fetchUsers(){
    return this.http.get(`${URL}users/home`)
  }

  // this is for single playlist
  fetchPlaylist(id:number){
    return this.http.get(`${URL}playlists/${id}`)
  }

  createPlaylist(playlist){
    const token = this.authService.getToken();

    return this.http.post("http://localhost:3000/api/v1/playlists", playlist, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    })
  }

  setPlaylists(playlists){
    this.currentUserPlaylist = playlists;
    this.currentUserPlaylistsSubject.next(playlists);
  }

  onUpdatedPlaylist(updatedPlaylist, id){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.put(`http://localhost:3000/api/v1/playlists/${id}`, updatedPlaylist, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }

  updatedPlaylist(editPlaylist:any){

    this.detailPlaylistSubject.next(editPlaylist)
    const index = this.currentUserPlaylist.findIndex(playlist => playlist.id === editPlaylist.id)
    this.currentUserPlaylist[index] = editPlaylist;
    this.setPlaylists(this.currentUserPlaylist);
  }

  deletePlaylist(id){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.delete(`http://localhost:3000/api/v1/playlists/${id}`,  {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }
}

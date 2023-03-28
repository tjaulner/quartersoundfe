import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'http://localhost:3000/api/v1/'

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http:HttpClient) { }

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
}

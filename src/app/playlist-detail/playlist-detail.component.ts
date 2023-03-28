import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {


  constructor(private activatedRoute:ActivatedRoute, private playlistService:PlaylistService, private http:HttpClient) { }

  //defined properties so that template can use them
  playlist: any = null;
  creator: any = null;
  otherPlaylist: any = null;
  profileUser: any = null;

  ngOnInit(): void {
    //this lets us access the information of the given playlist
    this.activatedRoute.params.subscribe((params)=>{
      const playlistId = params.id;
      this.playlistService.fetchPlaylist(playlistId).subscribe({
        next: (res: any)=>{
          console.log(res)
          this.playlist = res.payload.playlist;
          this.creator = res.payload.playlist.user;
          //this.otherPlaylist = res.payload.user.playlists; ///not working
        }
      })
    }) // delete below possibly, still reports undefined for user's other playlists - may need to just create service
    //this.activatedRoute.params.subscribe((creator)=>{
      //const username = creator.username;
      //this.http.get(`http://localhost:3000/api/v1/users/${creator.username}`).subscribe({
        //next: (res:any)=>{
          //this.profileUser = res.payload.user;
          //this.otherPlaylist = res.payload.user.playlists;
        //}
      //})
    //})
  }

}

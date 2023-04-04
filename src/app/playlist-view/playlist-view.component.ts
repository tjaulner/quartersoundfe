import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit {
  //defined property for template usage
  profileUser: any = null;
  profilePlaylists: any = null;
  currentUser: User = null;

  constructor(
    private userService: UserService,
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      // get user from params
      const username = params.username;
      // send request to get user info
      this.http.get(`http://localhost:3000/api/v1/users/${username}`).subscribe({
        next: (res:any)=>{
          this.profileUser = res.payload.user;
          this.profilePlaylists = res.payload.user.playlists;
        }
      })
    })
    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

}

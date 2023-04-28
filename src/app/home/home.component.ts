import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../shared/services/playlist.service';
import { MusicSearchComponent } from '../shared/modals/music-search/music-search.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../shared/models/user.model';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //local storage for home page/playlists
  suggestedPlaylists: any = []

  //local storage for home page/users
  suggestedUsers: any = []

  currentUser: User = null;

  constructor(
    private playlistService:PlaylistService,
    private dialogRef: MatDialog,
    private userService:UserService) { }

  ngOnInit(): void {
    this.playlistService.fetchPlaylists().subscribe((res: any)=>{
      if (res.success) {
        this.suggestedPlaylists = res.payload.suggested
      }
    });

    this.playlistService.fetchUsers().subscribe((res: any)=>{
      if (res.success) {
        this.suggestedUsers = res.payload.suggested
      }
    });

    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

  openMusicSearchDialog(){
    this.dialogRef.open(MusicSearchComponent, {
      height: '800px',
      width: '700px'
    });
  }

}

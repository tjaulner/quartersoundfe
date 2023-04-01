import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../shared/services/playlist.service';
import { UserService } from '../auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistComponent } from '../shared/modals/edit-playlist/edit-playlist.component';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {


  constructor(
    private activatedRoute:ActivatedRoute,
    private playlistService:PlaylistService,
    private http:HttpClient,
    private userService:UserService,
    private dialogRef:MatDialog,
    private route:Router
    ) { }

  //defined properties so that template can use them
  playlist: any = null;
  creator: any = null;
  otherPlaylist: any = null;
  profileUser: any = null;
  currentUser = null;

  ngOnInit(): void {
    //subscribes to changes in playlist information after edit
    this.playlistService.detailPlaylistSubject.subscribe((updatedPlaylist:any)=>{
      this.playlist = updatedPlaylist;
    })
    //subscribes to the current user info
    this.userService.currentUserSubject.subscribe((currentUser:any)=> {
      this.currentUser = currentUser
    })

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
    })
  }

  openEditPlaylistDialog(playlist){
    this.dialogRef.open(EditPlaylistComponent, {
      data: {
        id: this.playlist.id,
        playlist_name: this.playlist.playlist_name,
        about: this.playlist.about
      },
      height: '400px',
      width: '300px'
    });
  }

  onDeletePlaylist(){
    this.playlistService.deletePlaylist(this.playlist.id).subscribe({
      next: (res) =>{
        this.route.navigate([`/profile/${this.currentUser.username}`])
      }
    })
  }
}

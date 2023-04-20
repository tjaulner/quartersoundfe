import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { User } from '../models/user.model';
import { CreatePostComponent } from '../modals/create-post/create-post.component';
import { MusicSearchComponent } from '../modals/music-search/music-search.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: User = null;

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  openPlaylistDialog(){
    this.dialogRef.open(CreatePlaylistComponent, {
      height: '400px',
      width: '300px'
    })
  }

  openPostDialog(){
    this.dialogRef.open(CreatePostComponent, {
      height: '350px',
      width: '500px'
    })
  }

  openMusicSearchDialog(){
    this.dialogRef.open(MusicSearchComponent, {
      height: '800px',
      width: '700px'
    });
  }

}

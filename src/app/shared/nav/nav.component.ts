import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { CreatePlaylistComponent } from '../modals/create-playlist/create-playlist.component';
import { User } from '../models/user.model';

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

}

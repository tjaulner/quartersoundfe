import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user.service';
import { User } from '../shared/models/user.model';
import { EditProfileComponent } from '../shared/modals/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //defined property for template usage
  profileUser: any = null;
  profilePlaylists: any = null;
  currentUser: User = null;

  constructor(
    private activatedRoute:ActivatedRoute,
    private http:HttpClient,
    private userService: UserService,
    private dialogRef:MatDialog) { }

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

  openEditUserDialog(){
    this.dialogRef.open(EditProfileComponent, {
      data: {
        id: this.userService.currentUser.id,
        username: this.userService.currentUser.username,
        first_name: this.userService.currentUser.first_name,
        last_name: this.userService.currentUser.last_name
      },
      height: '500px',
      width: '400px'
    });
  }
  }



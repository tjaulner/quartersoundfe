import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //defined property for template usage
  profileUser: any = null;
  profilePlaylists: any = null;

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient) { }

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
  }

}

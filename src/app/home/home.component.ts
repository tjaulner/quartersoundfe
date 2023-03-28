import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../shared/services/playlist.service';

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

  constructor(private playlistService:PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.fetchPlaylists().subscribe((res: any)=>{
      console.log(res);
      if (res.success) {
        this.suggestedPlaylists = res.payload.suggested
      }
    });

    this.playlistService.fetchUsers().subscribe((res: any)=>{
      console.log(res);
      if (res.success) {
        this.suggestedUsers = res.payload.suggested
      }
    });
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicsearchService } from '../../services/musicsearch.service';
import { Track } from '../../models/track.model';
import { UserService } from 'src/app/auth/user.service';
import { User } from '../../models/user.model';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';


@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {
  searchResults = [];
  currentUser: User = null;
  //this is for the dialog menu
  panelOpenState = false;

  profilePlaylists: any = null;
  errors = [];

  constructor(
    private musicService: MusicsearchService,
    private userService: UserService,
    private playlistService: PlaylistService,
    private route:Router,
    public dialogRef: MatDialogRef<MusicSearchComponent>,
    public playlistRef: MatDialog

    ) { }

  ngOnInit(): void {
    this.searchResults = this.musicService.getResults(); // returns copy of existing []

    // search results
    this.musicService.resultsChanged.subscribe((data: any) => {
      this.searchResults = data;
      //console.log('comp data is:', data);
      //console.log('comp search results:', this.searchResults)
    });
    //testing for
    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
      //console.log('music serch on it user info is:', user)
      this.profilePlaylists = user.playlists;
      //console.log('music search results plist is?', user.playlists)
    });

    this.userService.pullUserPlaylists(this.currentUser.id);

  }
  // methods

  onSearchMusic(value){
    this.musicService.musicSearchResults(value);
    }

  saveButton(results, plist){
    //results.playlist = plist;
    results.playlist_id = plist.id;
    results.user_id = this.currentUser.id;
    this.musicService.saveResult(results).subscribe({
      next: (results) => {

        console.log(results);
        this.dialogRef.close()
        this.route.navigate([`/playlists/${plist.id}`])
        this.musicService.reloadPage()
      },
      error: (error) => {
        this.errors = error.error.errors;
        console.log(error);
      }
    })
  }
  // 5/28 looking for option to create new playlist and save track from music search
  newPlaylist(){
    this.playlistRef.open(CreatePlaylistComponent, {
      height: '400px',
      width: '300px'
  })
}




}

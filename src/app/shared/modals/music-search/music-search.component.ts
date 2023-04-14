import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicsearchService } from '../../services/musicsearch.service';
import { Track } from '../../models/track.model';
import { UserService } from 'src/app/auth/user.service';
import { User } from '../../models/user.model';


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

  constructor(
    private musicService: MusicsearchService,
    private userService: UserService,
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

  onSearchMusic(value){
    this.musicService.musicSearchResults(value);
    }

  saveButton(results, playlist_name){
    playlist_name = this.profilePlaylists.playlist_name // does not work yet 0413
    // trying to get the playlist name (from selection) to tie in with results
    // may not need this in the end - solution may be from back end put anyways..?
    //results.playlist = this.profilePlaylists.playlist_name
    this.musicService.saveResult(results)
    console.log('playlist name?', this.profilePlaylists.playlist_name)

  }




}

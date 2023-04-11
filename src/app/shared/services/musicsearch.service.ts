import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Track } from '../models/track.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicsearchService {

  iTunesUrl = 'https://itunes.apple.com/search';
  results = [];
  resultsChanged = new Subject<Track []>();


  constructor(private http:HttpClient) { }

  musicSearchResults(queryString) {
    this.http.get(`${this.iTunesUrl}?term=${queryString}&limit=25&media=music`).subscribe((res: any) => {
      const data = res.results;
      this.resultsChanged.next(data);
      //console.log('service results res=', res)
    });
    console.log("service results are:", this.results);

    }

  getResults(){
    return this.results.slice();
  }

  saveResult(results){
  //const {id, trackName, artistName, collectionName, primaryGenreName, releaseDate, artworkUrl60} = song; // this is from iTunes
  //const {id, song_name, artist_name, album, genre, release_date, albumArt} = song; // this is from Track Model

    let song = this.results.map<Track>(id => {
      return {
        id,
        song_name: null,
        artist_name: null,
        album: null,
        genre: null,
        release_date: null,
        albumArt: null,
      };
    });
    console.log(results)
    // the above does work (night of 4/10). Now to save to local library and test? THe results are still the data types of Itunes responses...
  }


  }


import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, map, pipe } from 'rxjs';
import { Track } from '../models/track.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class MusicsearchService {

  iTunesUrl = 'https://itunes.apple.com/search';
  results: Track[] = [];
  resultsChanged = new Subject<Track []>();
  savedResults: Track[] = [];


  constructor(private http:HttpClient, private authService: AuthService) { }

  musicSearchResults(queryString) {
    this.http.get(`${this.iTunesUrl}?term=${queryString}&limit=25&media=music`).subscribe((res: any) => {

      const data = res.results.map(track => {
        return {
          artist: track.artistName,
          trackname: track.trackName,
          album: track.collectionName,
          genre: track.primaryGenreName,
          year: track.releaseDate,
          album_img_url: track.artworkUrl60,
          play_preview_url: track.previewUrl,

        }
      });
      this.resultsChanged.next(data)
      console.log('map response data is?', data)
    });
    }

  getResults(){
    return this.results.slice();
  }

  //
  saveResult(results: Track){
    //this.savedResults.push(results);
      //console.log(results)
      //console.log('saved result []', this.savedResults)

    //testing this - results do try to post, getting null for playlist_id
    const token = this.authService.getToken();

    return this.http.post("http://localhost:3000/api/v1/tracks", results, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    })
  }
}

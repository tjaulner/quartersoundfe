import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Track } from '../models/track.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicsearchService {

  iTunesUrl = 'https://itunes.apple.com/search';
  results: Observable<Track[]>;

  constructor(private http:HttpClient) { }

  musicSearchResults(queryString): Observable<Track[]> {
    if (!this.results) {
    this.results = this.http.get<Track[]>
    (`${this.iTunesUrl}?term=${queryString}`);
    }
    return this.results;
  }


  }


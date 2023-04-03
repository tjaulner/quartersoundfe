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
  //results: Observable<Track[]>; ------------------// old v

  constructor(private http:HttpClient) { }

  //musicSearchResults(queryString): Observable<Track[]> { -----------// old v
    //if (!this.results) {
    //this.results = this.http.get<Track[]>
    //(`${this.iTunesUrl}?term=${queryString}`);
    //}
    //return this.results;
  //}

  musicSearchResults(queryString) {
    this.http.get(`${this.iTunesUrl}?term=${queryString}&limit=25&media=music`).subscribe((res: any) => {
      const data = res.results;
      this.resultsChanged.next(data);
    });
    console.log("service results are:", this.results);
    }

  getResults(){
    return this.results.slice();
  }




  }


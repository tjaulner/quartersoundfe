import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicsearchService } from '../../services/musicsearch.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {
  searchResults = [];
  //@Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  //iterableResults: string = null;
  panelOpenState = false;

  constructor(private musicService: MusicsearchService) { }

  ngOnInit(): void {
    this.searchResults = this.musicService.getResults(); // returns copy of existing []

    this.musicService.resultsChanged.subscribe((data: any) => {
      this.searchResults = data;
      console.log('comp data is:', data);
      console.log('comp search results:', this.searchResults)
    })
  }

  onSearchMusic(value){
    //this.searchQuery.emit(value);
    //this.musicService.musicSearchResults(value)

    // old v (testing new v)------
    //this.musicService.musicSearchResults(value).subscribe((data:Track[])=> {
      //this.searchResults = data;
      //let iterableResults = Object.values(this.searchResults);
      //console.log('iterable is: ', iterableResults)
    //})

    this.musicService.musicSearchResults(value);
    }

}

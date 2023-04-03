import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MusicsearchService } from '../../services/musicsearch.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {
  searchResults: Track[] = null;
  //@Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  iterableResults: string = null;

  constructor(private musicService: MusicsearchService) { }

  ngOnInit(): void {
  }

  onSearchMusic(value){
    //this.searchQuery.emit(value);
    //this.musicService.musicSearchResults(value)

    this.musicService.musicSearchResults(value).subscribe((data:Track[])=> {
      this.searchResults = data;
      let iterableResults = Object.values(this.searchResults);
      console.log('iterable is: ', iterableResults)
    })
    }

}

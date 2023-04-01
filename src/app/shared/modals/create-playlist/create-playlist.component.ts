import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  errors = [];

  playlistFormGroup = new FormGroup({
    playlist_name: new FormControl(''),
    about: new FormControl(''),
  })

  constructor(private playlistService:PlaylistService, public dialogRef: MatDialogRef<CreatePlaylistComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const newPlaylist = this.playlistFormGroup.value;

    this.playlistService.createPlaylist(newPlaylist).subscribe({
      next: (res)=>{

        console.log(res);
        this.dialogRef.close()
      },
      error: (error) => {
        this.errors = error.error.errors;
        console.log(error);
      },
    })

  }
}

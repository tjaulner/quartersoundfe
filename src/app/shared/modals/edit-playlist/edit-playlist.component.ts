import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../services/playlist.service';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {

  //variables to hold errors and formgroup data
  errors = [];
  editPlaylistForm: FormGroup
  playlistDetails: Playlist;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public playlist: Playlist, //injects data?
    private playlistService: PlaylistService
  ) {
    console.log('form data is:', playlist)
   }

  ngOnInit(): void {
    this.setForm(); //sets the form info that is passed from parent? (playlist detail)
  }

  setForm(){
    this.editPlaylistForm = this.formBuilder.group({
      id: [this.playlist.id],
      playlist_name: [this.playlist.playlist_name],
      about: [this.playlist.about]
    })
  }

  onSubmit(){
    const editedPlaylist = this.editPlaylistForm.value;
    console.log(this.editPlaylistForm.value)
    this.playlistService.onUpdatedPlaylist(editedPlaylist, this.playlist.id).subscribe({
      next: (res:any)=>{
        console.log('res is:', res)
        this.playlistService.updatedPlaylist(res.payload.playlist)
        this.dialogRef.close()
      },
      error: (error) => {
        this.errors = error.error.errors;
        console.log(error);
      },
    })
  }

}

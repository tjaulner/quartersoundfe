import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  errors = [];

  postFormGroup = new FormGroup({
    body: new FormControl(''),
  })

  constructor(private postService:PostService, public dialogRef: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const newPost = this.postFormGroup.value;

    this.postService.createPost(newPost).subscribe({
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

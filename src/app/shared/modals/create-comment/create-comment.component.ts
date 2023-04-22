import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  errors = [];
  post;

  postFormGroup = new FormGroup({
    body: new FormControl(''),
  })
  constructor(private postService:PostService, public dialogRef: MatDialogRef<CreateCommentComponent>) { }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe((res: any)=>{
      console.log('create comment fetch post is?', res)
    })
  }

  onSubmit(){
    const newComment = this.postFormGroup.value;

    this.postService.createComment(newComment).subscribe({
      next: (res)=>{

        console.log(res);
        this.dialogRef.close()
        this.postService.reloadPage()
      },
      error: (error) => {
        this.errors = error.error.errors;
        console.log(error);
      },
    })

  }

}

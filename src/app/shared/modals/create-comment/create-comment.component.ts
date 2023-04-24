import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    post_id: new FormControl(this.data.post_id), // this data is transferred from wall on openComment dialog
  })
  constructor(
    private postService:PostService,
    public dialogRef: MatDialogRef<CreateCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe((res: any)=>{
      console.log('create comment fetch post is?', res)
    })
    console.log('create comment inject data', this.data)
  }


  onSubmit(){
    const newComment = this.postFormGroup.value;
    console.log('new comment is?', newComment)
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

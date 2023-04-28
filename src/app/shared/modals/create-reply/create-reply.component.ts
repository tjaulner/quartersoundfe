import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit {
  errors = [];
  post;

  postFormGroup = new FormGroup({
    body: new FormControl(''),
    comment_id: new FormControl(this.data.comment_id), // this data is transferred from wall on openComment dialog
  })
  constructor(
    private postService:PostService,
    public dialogRef: MatDialogRef<CreateReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe((res: any)=>{

    })
    console.log('create reply inject data', this.data)
  }


  onSubmit(){
    const newReply = this.postFormGroup.value;
    console.log('new reply is?', newReply)
    this.postService.createReply(newReply).subscribe({
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  errors = [];
  editPostForm: FormGroup;
  allPosts: [] = [];




  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private postService: PostService
  ) {

   }

  ngOnInit(): void {
    this.setForm(this.post);
  }

  setForm(post){
    this.editPostForm = this.formBuilder.group({
      id: [this.post.id],
      body: [this.post.body]
    })
  }

  onSubmit(){
    const editedPost = this.editPostForm.value;
    this.postService.onUpdatedPost(editedPost, this.post.id).subscribe({
      next: (res: any)=> {
        this.postService.updatedPost(res.payload.post)
        this.dialogRef.close()
        this.postService.reloadPage()
      },
      error: (error) => {
        this.errors = error.error.errors;
      }
    })
  }
}

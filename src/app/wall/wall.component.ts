import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../shared/modals/create-post/create-post.component';
import { UserService } from '../auth/user.service';
import { EditPostComponent } from '../shared/modals/edit-post/edit-post.component';
import { CreateCommentComponent } from '../shared/modals/create-comment/create-comment.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  currentUser: User = null;
  allPosts: [] = [];
  post: any = null;
  allComments: [] = [];

  panelOpenState = false;

  constructor(
    private postService: PostService,
    private route:Router,
    private dialogRef:MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe({
      next: (res: any)=>{
        console.log('fetch posts', res);
        this.allPosts = res.payload.posts
      }
    })
    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
      console.log(this.currentUser)
    })
    this.postService.fetchComments().subscribe({
      next: (res: any) => {
        console.log('fetch comments', res);
        this.allComments = res.payload.comments;
      }
    })
  }


  openPostDialog(){
    this.dialogRef.open(CreatePostComponent, {
      height: '350px',
      width: '500px'
    })
  }

  openCommentDialog(post){

    console.log(post) // this does pull single post detail, including id
    this.dialogRef.open(CreateCommentComponent, {
      data: {
          post_id: post.id // this pulls the "post id" and transfers it to the create comment component through mat injection
      },
      height: '350px',
      width: '500px'
    })
  }

  openEditPostDialog(post){
      this.dialogRef.open(EditPostComponent, {
      data: {
        id: post.id,
        body: post.body
      },
      height: '350px',
      width: '500px'
    })
  }

  onDeletePost(post){
    this.postService.deletePost(post.id).subscribe({
      next: (res) => {
        //currently this will delete the post but page does not refresh
        this.route.navigate([`/home`])
    }}
    )
    this.reloadPage()
  }

  reloadPage(){
    window.location.reload()
  }

  onDeleteComment(comment){
    this.postService.deleteComment(comment.id).subscribe({
      next: (res) => {

        this.route.navigate([`/home`])
    }}
    )
    this.reloadPage()
  }

  addLike(post){

    this.postService.createLike(post.id).subscribe({
      next: (res) => {
        this.route.navigate([`/home`])
      }
    })

  }

}

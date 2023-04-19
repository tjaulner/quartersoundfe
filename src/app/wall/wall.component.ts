import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { PostService } from '../shared/services/post.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../shared/modals/create-post/create-post.component';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  currentUser: User = null;
  allPosts: [] = [];

  constructor(
    private postService: PostService,
    private route:Router,
    private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe({
      next: (res: any)=>{
        console.log(res);
        this.allPosts = res.payload.posts
      }
    })
  }
  openPostDialog(){
    this.dialogRef.open(CreatePostComponent, {
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
  }

}

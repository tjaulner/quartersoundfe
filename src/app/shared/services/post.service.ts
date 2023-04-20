import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


const URL = 'http://localhost:3000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  detailPostSubject: Subject<any> = new Subject;
  currentUserPost = [];
  currentUserPostsSubject: Subject<any> = new Subject;

  constructor(private http:HttpClient, private authService:AuthService) { }

  fetchPosts(){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.get(`${URL}posts/`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }

  //single post
  fetchPost(id:number){
    return this.http.get(`${URL}posts/${id}`)
  }

  createPost(post){
    const token = this.authService.getToken();

    return this.http.post("http://localhost:3000/api/v1/posts", post, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    })
  }

  deletePost(id){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.delete(`http://localhost:3000/api/v1/posts/${id}`,  {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }
  //used for autorefresh/turbo
  setPosts(posts){
    this.currentUserPost = posts;
    this.currentUserPostsSubject.next(posts);
  }

  onUpdatedPost(updatedPost, id){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.put(`http://localhost:3000/api/v1/posts/${id}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }
  //this is for the auto-refresh/turbo --- does not work as of 4/20, using reloadPage instead
  updatedPost(editPost:any){
    this.detailPostSubject.next(editPost)
    const index = this.currentUserPost.findIndex(post => post.id === editPost.id)
    this.currentUserPost[index] = editPost;
    this.setPosts(this.currentUserPost);
  }

  reloadPage(){
    window.location.reload()
  }
}

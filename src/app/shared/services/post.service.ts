import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


const URL = 'http://localhost:3000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  fetchPosts(){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.get(`${URL}posts/`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
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
}

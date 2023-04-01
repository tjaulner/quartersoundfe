import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth/auth.service';
import { CreatePlaylistComponent } from './shared/modals/create-playlist/create-playlist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoSignIn();
  }


}

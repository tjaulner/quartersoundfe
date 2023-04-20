import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { SignupComponent } from './auth/signup/signup.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePlaylistComponent } from './shared/modals/create-playlist/create-playlist.component';
import { EditPlaylistComponent } from './shared/modals/edit-playlist/edit-playlist.component';
import { EditProfileComponent } from './shared/modals/edit-profile/edit-profile.component';
import { MusicSearchComponent } from './shared/modals/music-search/music-search.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { WallComponent } from './wall/wall.component';
import { CreatePostComponent } from './shared/modals/create-post/create-post.component';
import { EditPostComponent } from './shared/modals/edit-post/edit-post.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    PlaylistDetailComponent,
    ProfileComponent,
    CreatePlaylistComponent,
    EditPlaylistComponent,
    EditProfileComponent,
    MusicSearchComponent,
    PlaylistViewComponent,
    WallComponent,
    CreatePostComponent,
    EditPostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

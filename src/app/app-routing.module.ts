import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePlaylistComponent } from './shared/modals/create-playlist/create-playlist.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent},
  { path: 'playlists/:id', component: PlaylistDetailComponent},
  { path: 'profile/:username', component: ProfileComponent},
  { path: 'createplaylist', component: CreatePlaylistComponent},
  { path: 'viewplaylists/:username', component: PlaylistViewComponent},
  { path: 'wall', component: WallComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

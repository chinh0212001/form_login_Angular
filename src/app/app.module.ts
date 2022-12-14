import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/gettingstarted/gettingstarted.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxAudioPlayerModule } from 'projects/ngx-audio-player/src/public_api';
import { MatButtonModule } from '@angular/material/button';

import {NavBarModule} from './shared/navbar';
import {FooterModule} from './shared/footer';
import { RegisterComponent } from './form-login/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './form-login/login/login.component';
import { ProfileComponent } from './form-login/profile/profile/profile.component';
import { ParentInputComponent } from './input/parent-input/parent-input.component';
import { ChildInputComponent } from './input/child-input/child-input.component';
import { ParentOutputComponent } from './output/parent-output/parent-output.component';
import { ChildOutputComponent } from './output/child-output/child-output.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import { SingerAvatarComponent } from './upload/singer-avatar/singer-avatar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MutilpleAvatarComponent } from './upload/mutilple-avatar/mutilple-avatar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AuthInterceptor} from './service/auth.interceptor';
import { UpdateAvatarComponent } from './form-login/profile/update-avatar/update-avatar.component';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component';
import {AuthGuard} from './seccurity/auth.guard';
import { AdminManagerComponent } from './form-login/profile/admin-manager/admin-manager.component';
import {AdminGuard} from './seccurity/admin.guard';
import { CategoryComponent } from './category/category/category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DialogCategoryComponent } from './dialog/dialog-category/dialog-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'guide/getting-started',
    component: GettingStartedComponent,
    data: { title: 'Getting Started' }
  },
  { path: 'register', component: RegisterComponent},
  {path: 'login',component: LoginComponent},
  {path:'profile', component:ProfileComponent,canActivate:[AuthGuard],
  children:[
    {path: 'update/avatar', component:UpdateAvatarComponent},
    {path:'admin', component:AdminManagerComponent, canActivate:[AdminGuard]}
  ]},
  {path: 'create-category', component:CategoryComponent, canActivate:[AuthGuard]},
  {path:'listCategory',component:ListCategoriesComponent},
  {path:'update-category/:id',component:UpdateCategoryComponent}

];

@NgModule({
  declarations: [AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, ProfileComponent, ParentInputComponent, ChildInputComponent, ParentOutputComponent, ChildOutputComponent, SingerAvatarComponent, MutilpleAvatarComponent, UpdateAvatarComponent, DialogComponent, AdminManagerComponent, CategoryComponent, ListCategoriesComponent, DialogCategoryComponent, UpdateCategoryComponent,],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NavBarModule, FooterModule,
    NgxAudioPlayerModule,
    MatDialogModule,
    MatInputModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: false}), FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatTableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

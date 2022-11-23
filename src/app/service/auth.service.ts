import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/JwtResponse';
import {SignForm} from '../model/SignForm';
import {ChangeAvatar} from '../model/change-avatar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //local
// private API_SIGNUP = environment.API_LOCAL + "signup";
// private API_SIGNIN = environment.API_LOCAL + "signin";
  //server
  private API_SIGNUP = environment.API_SERVE+ "signup";
  private API_SIGNIN = environment.API_SERVE+ "signin";
  private API_UPDATE_AVATAR = environment.API_SERVE + 'change/avatar';
  constructor(private http: HttpClient) {

  }
  signUp(signUpForm: SignUpForm): Observable<any>{
    return this.http.post(this.API_SIGNUP,signUpForm);
  }
  signIn(signInForm: SignForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN,signInForm);
  }
  updateAvatar(changeAvatar: ChangeAvatar):Observable<any>{
    return this.http.put(this.API_UPDATE_AVATAR,changeAvatar);
  }
}

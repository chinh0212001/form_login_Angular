import { Component, OnInit } from '@angular/core';
import {SignForm} from '../../model/SignForm';
import {TokenService} from '../../service/token.service';
import {AuthService} from '../../service/auth.service';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  hide =true;
  signInForm: SignForm;
  status = 'please fill in the form login!';

  constructor(private authService: AuthService,
              private tokenService : TokenService,
                 private router:Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('SUCCESS_KEY')!= null){
      this.status = localStorage.getItem('SUCCESS_KEY')
    }
    this.status = "please fill in the form to login!"
  }

  login() {
  this.signInForm = new SignForm(
    this.form.username,
    this.form.password
  );
  this.authService.signIn(this.signInForm).subscribe(data=>{
    console.log("data--->",data);
    if (data.token != undefined){
      this.tokenService.setToken(data.token);
      this.tokenService.setName(data.name);
      this.tokenService.setAvatar(data.avatar);
      this.tokenService.setRole(data.roles);
      localStorage.removeItem('SUCCESS_KEY');
      this.router.navigate(['profile']).then(()=>{
        location.reload();
      })//dieu huong tu TS ====> component
    }
    // @ts-ignore
    if (data.status == 202){
      console.log("login failed! please check your username or password!");
    }
  })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {AuthService} from '../../service/auth.service';
import {SignUpForm} from '../../model/SignUpForm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form: any = {};
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  hide: boolean;
signUpForm: SignUpForm;
  status = 'Please fill in the form to create account!';
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.signUpForm = new SignUpForm(
      this.form.name ,
      this.form.username,
      this.form.email,
      this.form.password
    );
    console.log("this.singform",this.signUpForm);
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log("data --->",data);
      if(data.message === "nouser"){
        this.status = "Username is existed! Please try again!";
        return;
      }
      if (data.message === "noemail"){
        this.status = "email is existed! please try again!";
      }
      if (data.message === "yes"){
        this.status = "create account success!";
        localStorage.setItem('SUCCESS_KEY',this.status);
        this.router.navigate(['login'])
      }
    },
      error => {
        console.log("error",error);
        this.status = "email invalid! Please try again!"
      });
  }
}

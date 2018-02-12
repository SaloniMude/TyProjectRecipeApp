import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private errorMessage: string;


  constructor(private authService: AuthService) { 
    this.authService.getLoginErrors().subscribe(error => {
      this.errorMessage = error;
    });
  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

}

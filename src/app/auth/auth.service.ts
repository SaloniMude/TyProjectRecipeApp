import { RecipeService } from './../recipes/recipe.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
    token: string;
    userID: string;

    private logInErrorSubject = new Subject<string>();
    public getLoginErrors(): Subject<string>{
        return this.logInErrorSubject;
 }

    constructor(private router: Router, private recipes: RecipeService ){}
    
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                this.router.navigate(['/recipes']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                );
            }
        )
        .catch (
            error => this.logInErrorSubject.next('Invalid username or password')
        );
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
        this.recipes.clearRecipes();

    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then (
            (token: string) => this.token = token
        );
        return this.token;
    }

    getUserId() {
        this.userID = firebase.auth().currentUser.uid;
        return this.userID;
    }

    isAuthenticated() {
        return this.token != null;
    }
}

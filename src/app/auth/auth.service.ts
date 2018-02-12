import { RecipeService } from './../recipes/recipe.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    userID : string;

    constructor(private router: Router, private recipes: RecipeService ){}
    
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                this.router.navigate(['/recipes']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                );
            }
        )
        .catch (
            error => console.log(error)
            
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

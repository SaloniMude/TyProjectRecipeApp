import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        const userId = this.authService.getUserId();
        return this.http.put('https://recipebook-86a50.firebaseio.com/recipes/users/'+ userId +'.json?auth=' + token, this.recipeService.getRecipies());
         /* put triggers old data to be completely overwrriten with firebase */
    } 

    getRecipes() {
        const token = this.authService.getToken();
        const userId = this.authService.getUserId();
        this.http.get('https://recipebook-86a50.firebaseio.com/recipes/users/'+ userId +'.json?auth=' + token).map(
            (response: Response) => {
                const recipes: Recipe[] = response.json(); //turns json data into js object
                for(let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] =[]
                    }
                }
                return recipes;
            }
        ).subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
        ;
    }
}
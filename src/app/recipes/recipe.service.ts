import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
   
    private recipes: Recipe[] = [
    new Recipe(
        'A Tasty Scnitzel',
         'A super tasty Scnitzel', 'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
     new Recipe('Big Burger',
     'Mmm Burger', 'http://i4.mirror.co.uk/incoming/article10403752.ece/ALTERNATES/s615/McDonalds-release-vegan-burger-but-youll-have-to-travel-pretty-far-to-get-one.jpg',
    [
        new Ingredient('Buns', 2),
        new Ingredient ('Meat', 1)

    ])
  ];
  constructor(private slService: ShoppingListService ) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipies() {
      return this.recipes.slice(); // this returns an exact COPY of the array within this service and not the actual array itself.
  }

  getRecipe(index: number) {
      return this.recipes[index];
  }



  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
  }

  clearRecipes() {
    return this.recipes = [] ;

  }
}
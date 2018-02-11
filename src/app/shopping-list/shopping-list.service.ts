import { Ingredient } from "app/shared/ingredient.model";
// import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] =  [
    new Ingredient ("Apples", 5),
    new Ingredient ("Tomatoes", 10),
  ];

    getIngredients() {
        return this.ingredients.slice();// this returns only a copy of the array not the original array
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients); /* ... is an ES6 spread operator that pushes an array into a list. 
        This can't be an array because then it would push it as an single object to the other array
        By putting them in a list we can now push each ingredient individually instead of the whole array object*/

        this.ingredientsChanged.next(this.ingredients.slice());

    }

    updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}

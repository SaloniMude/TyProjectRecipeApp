import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit,  } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription : Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private currentRoute : ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipies(); // this gets you the COPY of the array of receipes from the recipe service
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.currentRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

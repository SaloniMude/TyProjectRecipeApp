import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard]
    },

    {
        path: 'shopping-list', component: ShoppingListComponent
    }

]


@NgModule( {
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule] //exports configured router

})

export class AppRoutingModule
{

}
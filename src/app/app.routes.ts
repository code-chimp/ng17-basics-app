import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

import { DataStorageService } from './services/data-storage.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesService } from './services/recipes.service';

const recipesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const recipes = inject(RecipesService).getRecipes();
  return !recipes.length ? inject(DataStorageService).fetchRecipes() : recipes;
};

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { data: recipesResolver },
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { data: recipesResolver },
      },
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: '**',
        component: FourOhFourComponent,
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];

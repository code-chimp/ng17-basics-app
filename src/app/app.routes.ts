import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
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

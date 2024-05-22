import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  ResolveFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { DataStorageService } from './services/data-storage.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesService } from './services/recipes.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): MaybeAsync<GuardResult> => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  return authSvc.user.pipe(
    take(1),
    map(user => {
      const authenticated = !!user;

      if (!authenticated) {
        return router.createUrlTree(['/auth']);
      }

      return authenticated;
    }),
  );
};

const recipesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const recipes = inject(RecipesService).getRecipes();
  return !recipes.length ? inject(DataStorageService).fetchRecipes() : recipes;
};

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuard],
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

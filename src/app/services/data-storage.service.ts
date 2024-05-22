import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { IRecipe } from '../@interfaces/IRecipe';
import { AuthService } from './auth.service';

/**
 * DataStorageService is a service that provides methods for storing and fetching recipes.
 * It uses Firebase Realtime Database REST API for storing and fetching recipes.
 *
 * @Injectable({ providedIn: 'root' }) decorator indicates that this service should be created
 * by the root application injector.
 */
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private http = inject(HttpClient);
  private authSvc = inject(AuthService);
  private recipesSvc = inject(RecipesService);

  /**
   * storeRecipes method sends a PUT request to the Firebase Realtime Database REST API
   * to store the current state of recipes.
   *
   * @returns {void} - This method does not return anything.
   */
  storeRecipes() {
    const recipes = this.recipesSvc.getRecipes();

    this.http
      .put<
        IRecipe[]
      >('https://ng17-recipe-book-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(recipes => console.info(recipes));
  }

  /**
   * fetchRecipes method sends a GET request to the Firebase Realtime Database REST API
   * to fetch the stored recipes.
   *
   * @returns {Observable<IRecipe[]>} - An Observable of the IRecipe interface array.
   */
  fetchRecipes() {
    return this.http
      .get<IRecipe[]>('https://ng17-recipe-book-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes =>
          recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients || [] })),
        ),
        tap(recipes => {
          this.recipesSvc.setRecipes(recipes);
        }),
      );
  }
}

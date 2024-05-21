import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { IRecipe } from '../@interfaces/IRecipe';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private http = inject(HttpClient);
  private recipesSvc = inject(RecipesService);

  storeRecipes() {
    const recipes = this.recipesSvc.getRecipes();

    this.http
      .put<
        IRecipe[]
      >('https://ng17-recipe-book-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(recipes => console.info(recipes));
  }

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

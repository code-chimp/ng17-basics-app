import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import IngredientModel from '../models/ingredient.model';
import RecipeModel from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged = new Subject<Array<RecipeModel>>();

  private recipes: Array<RecipeModel> = [
    new RecipeModel(
      1,
      'Tasty Schnitzel',
      'A super tasty schnitzel - Just awesome!',
      'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/05/thumb-1200x675.jpg',
      [new IngredientModel('Pork Cutlet', 1), new IngredientModel('Pommes Frites', 20)],
    ),
    new RecipeModel(
      2,
      'Big Fat Burger',
      'What else needs be said?',
      'https://www.fatbrands.com/wp-content/uploads/2023/03/fatburger-listing.jpg',
      [
        new IngredientModel('Buns', 2),
        new IngredientModel('Meat', 3),
        new IngredientModel('Cheese', 3),
      ],
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): RecipeModel | null {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Omit<RecipeModel, 'id'>) {
    const id = Math.max(...this.recipes.map(r => r.id)) + 1;

    this.recipes.push({ id, ...recipe });

    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: RecipeModel) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes[index] = { ...recipe };

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());
  }
}

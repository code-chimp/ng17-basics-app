import { Injectable } from '@angular/core';
import RecipeModel from '../models/recipe.model';
import IngredientModel from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Array<RecipeModel> = [
    new RecipeModel(
      1,
      'Tasty Schnitzel',
      'A super tasty schnitzel - Just awesome!',
      'https://placehold.co/600x400/jpg',
      [new IngredientModel('Pork Cutlet', 1), new IngredientModel('Pommes Frites', 20)],
    ),
    new RecipeModel(
      2,
      'Big Fat Burger',
      'What else needs be said?',
      'https://placehold.co/600x400/png',
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
}

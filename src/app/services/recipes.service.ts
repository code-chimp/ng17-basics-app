import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IRecipe } from '../@interfaces/IRecipe';

/**
 * RecipesService is a service that manages a list of recipes.
 * It provides methods to get, add, update, and delete recipes.
 * It also provides a Subject to subscribe to for changes in the recipes list.
 */
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  /**
   * A Subject that emits the current list of recipes whenever it changes.
   */
  recipesChanged = new Subject<IRecipe[]>();

  /**
   * The current list of recipes.
   */
  private recipes: IRecipe[] = [];

  /**
   * Sets the list of recipes to the specified list and emits the updated list.
   * @param recipes - The new list of recipes.
   */
  setRecipes(recipes: IRecipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Returns a copy of the current list of recipes.
   */
  getRecipes(): IRecipe[] {
    return this.recipes.slice();
  }

  /**
   * Returns the recipe with the specified id.
   * @param id - The id of the recipe to return.
   */
  getRecipe(id: number): IRecipe | null {
    return this.recipes.find(recipe => recipe.id === id);
  }

  /**
   * Adds a new recipe to the list and emits the updated list.
   * The new recipe's id is one greater than the maximum id in the current list.
   * @param recipe - The recipe to add, without an id.
   */
  addRecipe(recipe: Omit<IRecipe, 'id'>) {
    const id = Math.max(...this.recipes.map(r => r.id)) + 1;

    this.recipes.push({ id, ...recipe });

    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Replaces the recipe with the specified id with a new recipe and emits the updated list.
   * @param id - The id of the recipe to replace.
   * @param recipe - The new recipe.
   */
  updateRecipe(id: number, recipe: IRecipe) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes[index] = { ...recipe };

    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Removes the recipe with the specified id from the list and emits the updated list.
   * @param id - The id of the recipe to remove.
   */
  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(r => r.id === id);
    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IIngredient } from '../@interfaces/IIngredient';

/**
 * ShoppingListService is a service that manages a shopping list of ingredients.
 * It provides methods to get, add, update, and delete ingredients.
 * It also provides Subjects to subscribe to for changes in the ingredients list and editing state.
 */
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  /**
   * A Subject that emits the current list of ingredients whenever it changes.
   */
  ingredientsChanged = new Subject<IIngredient[]>();

  /**
   * A Subject that emits the index of the ingredient that is currently being edited.
   */
  startEditing = new Subject<number>();

  /**
   * The current list of ingredients.
   */
  private ingredients: IIngredient[] = [];

  /**
   * Returns a copy of the current list of ingredients.
   */
  getIngredients() {
    return this.ingredients.slice();
  }

  /**
   * Returns the ingredient at the specified index.
   * @param index - The index of the ingredient to return.
   */
  getIngredient(index: number): IIngredient {
    return this.ingredients[index];
  }

  private addUpdateIngredient(ingredient: IIngredient) {
    const existingIngredientIndex = this.ingredients.findIndex(
      i => i.name === ingredient.name,
    );

    if (existingIngredientIndex !== -1) {
      const existingIngredient = this.ingredients[existingIngredientIndex];
      const updatedIngredient = {
        ...existingIngredient,
        amount: existingIngredient.amount + ingredient.amount,
      };
      this.ingredients.splice(existingIngredientIndex, 1, updatedIngredient);
      return;
    }

    this.ingredients.unshift(ingredient);
  }

  /**
   * Adds a new ingredient to the start of the list and emits the updated list.
   * @param ingredient - The ingredient to add.
   */
  addIngredient(ingredient: IIngredient) {
    this.addUpdateIngredient(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Adds multiple new ingredients to the start of the list and emits the updated list.
   * @param ingredients - The ingredients to add.
   */
  addIngredients(ingredients: IIngredient[]) {
    ingredients.forEach(ingredient => this.addUpdateIngredient(ingredient));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Replaces the ingredient at the specified index with a new ingredient and emits the updated list.
   * @param index - The index of the ingredient to replace.
   * @param ingredient - The new ingredient.
   */
  updateIngredient(index: number, ingredient: IIngredient) {
    this.ingredients.splice(index, 1);
    this.ingredients.unshift(ingredient);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Removes the ingredient at the specified index from the list and emits the updated list.
   * @param index - The index of the ingredient to remove.
   */
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

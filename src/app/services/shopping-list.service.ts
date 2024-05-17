import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import IngredientModel from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Array<IngredientModel>>();
  startEditing = new Subject<number>();

  private ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number): IngredientModel {
    return this.ingredients[index];
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.unshift(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<IngredientModel>) {
    this.ingredients.unshift(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: IngredientModel) {
    this.ingredients.splice(index, 1);
    this.ingredients.unshift(ingredient);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

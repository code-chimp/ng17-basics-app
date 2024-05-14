import { EventEmitter, Injectable } from '@angular/core';
import IngredientModel from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ];

  ingredientAdded = new EventEmitter<IngredientModel>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.unshift(ingredient);
  }

  addIngredients(ingredients: Array<IngredientModel>) {
    this.ingredients.unshift(...ingredients);
  }
}

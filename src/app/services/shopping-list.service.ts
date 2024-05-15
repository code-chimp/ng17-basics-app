import { Injectable } from '@angular/core';
import IngredientModel from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Array<IngredientModel>>();

  private ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.unshift(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<IngredientModel>) {
    this.ingredients.unshift(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

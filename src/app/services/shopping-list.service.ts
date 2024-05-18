import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IIngredient } from '../@interfaces/IIngredient';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<IIngredient[]>();
  startEditing = new Subject<number>();

  private ingredients: IIngredient[] = [
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number): IIngredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: IIngredient) {
    this.ingredients.unshift(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IIngredient[]) {
    this.ingredients.unshift(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: IIngredient) {
    this.ingredients.splice(index, 1);
    this.ingredients.unshift(ingredient);

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

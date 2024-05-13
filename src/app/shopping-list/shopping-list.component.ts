import { Component } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import IngredientModel from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ];

  handleIngredientAdded(ingredient: IngredientModel) {
    this.ingredients.unshift(ingredient);
  }
}

import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import IngredientModel from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<IngredientModel> = [];

  constructor(private svc: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.svc.getIngredients();

    this.svc.ingredientAdded.subscribe((ingredient: IngredientModel) => {
      this.svc.addIngredient(ingredient);
      this.ingredients = this.svc.getIngredients();
    });
  }
}

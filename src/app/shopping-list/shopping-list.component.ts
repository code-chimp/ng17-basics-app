import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import IngredientModel from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<IngredientModel> = [];

  private sub: Subscription;

  constructor(private svc: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.svc.getIngredients();

    this.sub = this.svc.ingredientsChanged.subscribe((ingredients: Array<IngredientModel>) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

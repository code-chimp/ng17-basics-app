import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IIngredient } from '../@interfaces/IIngredient';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IIngredient[] = [];

  private sub: Subscription;

  constructor(private svc: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.svc.getIngredients();

    this.sub = this.svc.ingredientsChanged.subscribe((ingredients: IIngredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleItemClick(index: number) {
    this.svc.startEditing.next(index);
  }
}

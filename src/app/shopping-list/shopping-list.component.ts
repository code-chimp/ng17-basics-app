import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
  private shoppingListSvc = inject(ShoppingListService);

  protected ingredients = signal<IIngredient[]>([]); //: IIngredient[] = [];

  private ingredientsChangedSub: Subscription;

  ngOnInit(): void {
    this.ingredients.set(this.shoppingListSvc.getIngredients());

    this.ingredientsChangedSub = this.shoppingListSvc.ingredientsChanged.subscribe(
      (ingredients: IIngredient[]) => {
        this.ingredients.set(ingredients);
      },
    );
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSub.unsubscribe();
  }

  handleItemClick(index: number) {
    this.shoppingListSvc.startEditing.next(index);
  }
}

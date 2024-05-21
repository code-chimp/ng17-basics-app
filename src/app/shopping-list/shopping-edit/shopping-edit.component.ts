import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private shoppingListSvc = inject(ShoppingListService);

  sub: Subscription;
  editIndex: number;
  editMode = false;

  ingredientForm = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    amount: new FormControl<number>(null, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.sub = this.shoppingListSvc.startEditing.subscribe((index: number) => {
      const ingredient = this.shoppingListSvc.getIngredient(index);

      this.ingredientForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
      this.editIndex = index;
      this.editMode = true;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSubmit() {
    const { name, amount } = this.ingredientForm.value;

    if (this.editMode) {
      this.shoppingListSvc.updateIngredient(this.editIndex, { name, amount });
    } else {
      this.shoppingListSvc.addIngredient({ name, amount });
    }

    this.handleClearClick();
  }

  /** Clears the form. */
  handleClearClick() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  /** Deletes the ingredient at the current index and clears the form. */
  handleDeleteClick() {
    this.shoppingListSvc.deleteIngredient(this.editIndex);
    this.handleClearClick();
  }
}

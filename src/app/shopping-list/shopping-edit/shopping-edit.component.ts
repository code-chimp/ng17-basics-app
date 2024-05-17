import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import IngredientModel from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  editIndex: number;
  editMode = false;

  ingredientForm = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    amount: new FormControl<number>(null, [Validators.required, Validators.min(1)]),
  });

  constructor(private svc: ShoppingListService) {}

  ngOnInit(): void {
    this.sub = this.svc.startEditing.subscribe((index: number) => {
      const ingredient = this.svc.getIngredient(index);

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
      this.svc.updateIngredient(this.editIndex, new IngredientModel(name, amount));
    } else {
      this.svc.addIngredient(new IngredientModel(name, amount));
    }

    this.handleClearClick();
  }

  handleClearClick() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  handleDeleteClick() {
    this.svc.deleteIngredient(this.editIndex);
    this.handleClearClick();
  }
}

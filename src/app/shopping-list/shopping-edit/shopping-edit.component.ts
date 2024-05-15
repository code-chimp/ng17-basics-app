import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import IngredientModel from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  ingredientForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(''),
  });

  constructor(private svc: ShoppingListService) {}

  handleSubmit() {
    const { name, amount } = this.ingredientForm.value;

    this.svc.ingredientsChanged.emit(new IngredientModel(name, amount ? +amount : 0));

    this.ingredientForm.reset();
  }

  handleClearClick() {
    this.ingredientForm.reset();
  }
}

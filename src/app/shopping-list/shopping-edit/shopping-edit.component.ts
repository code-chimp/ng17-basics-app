import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import IngredientModel from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<IngredientModel>();

  ingredientForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(''),
  });

  handleSubmit() {
    const { name, amount } = this.ingredientForm.value;

    this.ingredientAdded.emit(new IngredientModel(name, amount ? +amount : 0));

    this.ingredientForm.reset();
  }
}
